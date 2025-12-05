import React, { useState, useEffect, useRef } from "react";
import type { Post } from "../../../types/Post";
import { createPost } from "../../Services/PostServices";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (novoPost: Post) => void;
};

const CriarPostModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  useEffect(() => {
    if (!open) {
      setTitulo("");
      setConteudo("");
      setImagem(null);
      setLoading(false);
      setDragOver(false);
      setSnackbar({ open: false, message: "", severity: "info" });
    }
  }, [open]);

  const comprimirImagem = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Redimensiona se muito grande
          const maxWidth = 800;
          const maxHeight = 600;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Comprime em JPEG com qualidade 0.7
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => {
                  resolve(reader.result as string);
                };
              }
            },
            "image/jpeg",
            0.7
          );
        };
        img.onerror = () => reject(new Error("Erro ao carregar imagem"));
      };
      reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    });
  };

  const converterImagemParaBase64 = async (file: File) => {
    try {
      const imagemComprimida = await comprimirImagem(file);
      setImagem(imagemComprimida);
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao processar imagem.", severity: "error" });
    }
  };

  const handleImagemSelecionada = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setSnackbar({ open: true, message: "Por favor, selecione um arquivo de imagem.", severity: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSnackbar({ open: true, message: "Imagem muito grande. Máximo 5MB.", severity: "error" });
      return;
    }
    converterImagemParaBase64(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImagemSelecionada(file);
    }
  };

  const validar = () => {
    if (!titulo.trim()) {
      setSnackbar({ open: true, message: "Título é obrigatório.", severity: "error" });
      return false;
    }
    if (!conteudo.trim()) {
      setSnackbar({ open: true, message: "Conteúdo é obrigatório.", severity: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validar()) return;

    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setSnackbar({ open: true, message: "Usuário não autenticado.", severity: "error" });
        setLoading(false);
        return;
      }

      const novo: Omit<Post, "id"> = {
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        imagem: imagem || undefined,
        autorId: parseInt(userId),
        publicado: true,
      } as Omit<Post, "id">;

      const criado = await createPost(novo);
      onSuccess(criado);
      setSnackbar({ open: true, message: "Post criado com sucesso.", severity: "success" });
      onClose();
    } catch (err) {
      console.error("Erro ao criar post:", err);
      setSnackbar({ open: true, message: "Erro ao criar post.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Novo Post</DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              fullWidth
              size="small"
              autoFocus
            />
            <TextField
              label="Conteúdo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              fullWidth
              size="small"
              multiline
              rows={4}
            />

            {/* Área de upload de imagem */}
            <Paper
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                border: "2px dashed",
                borderColor: dragOver ? "primary.main" : "divider",
                backgroundColor: dragOver ? "action.hover" : "background.paper",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImagemSelecionada(file);
                  }
                }}
              />
              {imagem ? (
                <Box>
                  <img
                    src={imagem}
                    alt="preview"
                    style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagem(null);
                      }}
                    >
                      Remover Imagem
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <ImageIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                  <p style={{ margin: "8px 0", fontWeight: 500 }}>
                    Arraste uma imagem aqui ou clique para selecionar
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "gray" }}>
                    (Máximo 5MB)
                  </p>
                </Box>
              )}
            </Paper>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} color="inherit" disabled={loading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : undefined}
            >
              Criar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CriarPostModal;
