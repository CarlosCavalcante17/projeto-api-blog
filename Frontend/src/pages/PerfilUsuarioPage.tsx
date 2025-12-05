import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, IconButton, CircularProgress, Stack, Card, CardContent, CardMedia, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getPosts } from "../components/Posts/../../Services/PostServices";
import { getComentarios } from "../Services/ComentarioServices";
import type { Post } from "../../types/Post";
import type { comments } from "../../types/Comentario";


import { getUsuarioById } from "../Services/UserServices";
import type { user } from "../../types/Usuario";

const PerfilUsuarioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comentarios, setComentarios] = useState<comments[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<user | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allPosts, allComentarios, usuarioData] = await Promise.all([
          getPosts(),
          getComentarios(),
          getUsuarioById(userId)
        ]);
        setPosts(allPosts.filter((p) => ((p as any).autorId ?? (p as any).id_autor) === userId));
        setComentarios(allComentarios.filter((c) => ((c as any).autorId ?? (c as any).id_autor) === userId));
        setUsuario(usuarioData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <Box p={3}>
      <IconButton onClick={() => navigate(-1)} size="small">
        <ArrowBackIcon fontSize="small" />
      </IconButton>
      <Typography variant="h5" fontWeight={600} mb={2}>
        {usuario ? `Perfil de ${usuario.nome}` : `Perfil do Usuário #${userId}`}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" mb={2} fontWeight={600}>Posts do usuário</Typography>
            {posts.length === 0 ? (
              <Typography color="text.secondary">Nenhum post encontrado.</Typography>
            ) : (
              <Stack spacing={2}>
                {posts.map((post) => {
                  const p = post as Post & { autor?: { nome: string } };
                  return (
                    <Card key={p.id} sx={{ display: 'flex', alignItems: 'center', p: 1, boxShadow: 2 }}>
                      {p.imagem && (
                        <CardMedia
                          component="img"
                          image={p.imagem}
                          alt={p.titulo}
                          sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, mr: 2 }}
                        />
                      )}
                      <CardContent sx={{ flex: 1, p: 1 }}>
                        <Typography fontWeight={600} fontSize={18}>{p.titulo}</Typography>
                        <Typography variant="subtitle2" color="primary" sx={{ mt: 0.5, mb: 1 }}>
                          {p.autor?.nome ? `por ${p.autor.nome}` : ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{p.conteudo}</Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            )}
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2} fontWeight={600}>Comentários do usuário</Typography>
            {comentarios.length === 0 ? (
              <Typography color="text.secondary">Nenhum comentário encontrado.</Typography>
            ) : (
              <Stack spacing={2}>
                {comentarios.map((c) => (
                  <Card key={c.id} sx={{ p: 1, boxShadow: 1 }}>
                    <CardContent sx={{ p: 1 }}>
                      <Typography fontWeight={500} fontSize={15}>
                        No post #{c.postId}
                      </Typography>
                      <Divider sx={{ my: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">{c.texto}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default PerfilUsuarioPage;
