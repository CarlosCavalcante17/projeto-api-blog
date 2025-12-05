import React from "react";
import type { Post } from "../../../types/Post";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";

interface Props {
  post: Post & { autor?: { nome: string } };
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
}

const PostCard: React.FC<Props> = ({ post, onEdit, onDelete }) => {
  return (
    <Card>
      {post.imagem && (
        <CardMedia
          component="img"
          height="200"
          image={post.imagem}
          alt={post.titulo}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent>
        <Typography variant="h6">{post.titulo}</Typography>
        <Typography variant="subtitle2" color="primary" sx={{ mt: 0.5, mb: 1 }}>
          {post.autor?.nome ? `por ${post.autor.nome}` : ""}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {post.conteudo}
        </Typography>
        {post.criadoEm && (
          <Typography variant="caption" color="text.secondary">
            {new Date(post.criadoEm).toLocaleString()}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {onEdit && <Button size="small" onClick={() => onEdit(post)}>Editar</Button>}
        {onDelete && <Button size="small" color="error" onClick={() => onDelete(post.id)}>Excluir</Button>}
      </CardActions>
    </Card>
  );
};

export default PostCard;