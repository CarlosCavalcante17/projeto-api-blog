import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Stack, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post } from "../../../types/Post";
import type { comments } from "../../../types/Comentario";
import { getComentariosByPost, createComentario, deleteComentario } from "../../Services/ComentarioServices";

interface Props {
  post: Post;
  userId: number;
}

const ComentariosList: React.FC<Props> = ({ post, userId }) => {
  const [comentarios, setComentarios] = useState<comments[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const fetchComentarios = async () => {
    setLoading(true);
    try {
      const data = await getComentariosByPost(post.id);
      setComentarios(data);
    } catch (err) {
      setComentarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, [post.id]);

  const handleEnviar = async () => {
    if (!novoComentario.trim()) return;
    setEnviando(true);
    try {
        const criado = await createComentario({
          texto: novoComentario,
          autorId: userId,
          postId: post.id
        });
      setComentarios((prev) => [criado, ...prev]);
      setNovoComentario("");
    } catch (err) {

    } finally {
      setEnviando(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteComentario(id);
      setComentarios((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
    
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>Comentários</Typography>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <TextField
          label="Novo comentário"
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleEnviar} disabled={enviando || !novoComentario.trim()}>
          Enviar
        </Button>
      </Stack>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Stack spacing={2}>
          {comentarios.length === 0 ? (
            <Typography color="text.secondary">Nenhum comentário ainda.</Typography>
          ) : (
            comentarios.map((comments) => (
              <Box key={comments.id} sx={{ p: 1, border: "1px solid #eee", borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {typeof comments.autor === "string"
                          ? comments.autor
                          : comments.autor?.nome || "Usuário"}
                      </Typography>
                    <Typography variant="body2" color="text.secondary">{comments.texto}</Typography>
                  </Box>
                  {comments.autorId === userId && (
                    <IconButton size="small" color="error" onClick={() => handleDelete(comments.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            ))
          )}
        </Stack>
      )}
    </Box>
  );
};

export default ComentariosList;
