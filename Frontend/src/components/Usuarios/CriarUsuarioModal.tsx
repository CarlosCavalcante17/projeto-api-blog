import React, { useState, useEffect } from "react";
import type { user } from "../../../types/Usuario";
import { createUsuario } from "../../Services/UserServices";
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
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (novoUsuario: user) => void;
};

const CriarUsuarioModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info" | "warning",
  });

  useEffect(() => {
    if (!open) {
      setNome("");
      setEmail("");
      setSenha("");
      setLoading(false);
      setSnackbar({ open: false, message: "", severity: "info" });
    }
  }, [open]);

  const validar = () => {
    if (!nome.trim()) {
      setSnackbar({ open: true, message: "Nome é obrigatório.", severity: "error" });
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setSnackbar({ open: true, message: "Email inválido.", severity: "error" });
      return false;
    }
    if (!senha.trim() || senha.length < 6) {
      setSnackbar({ open: true, message: "Senha precisa ter ao menos 6 caracteres.", severity: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validar()) return;

    setLoading(true);
    try {
      const novo: Partial<user> = { nome: nome.trim(), email: email.trim(), senha: senha };
      const criado = await createUsuario(novo as user);
      onSuccess(criado);
      setSnackbar({ open: true, message: "Usuário criado com sucesso.", severity: "success" });
      onClose();
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      setSnackbar({ open: true, message: "Erro ao criar usuário.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Novo Usuário</DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent dividers>
            <TextField
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              autoFocus
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              type="email"
            />
            <TextField
              label="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
              type="password"
            />
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

export default CriarUsuarioModal;