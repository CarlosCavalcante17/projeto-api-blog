import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostsList from "../components/Posts/PostsList";
import CriarPostModal from "../components/Posts/CriarPostModal";
import type { Post } from "../../types/Post";

const PostsPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [ , setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const handleCreateSuccess = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 2, position: "relative" }}>
      <IconButton
        aria-label="voltar"
        onClick={() => navigate("/home")}
        size="small"
        sx={{ position: "absolute", left: 8, top: 8 }}
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>
      <Box sx={{ mt: 4 }}>
        <PostsList
          onCreate={() => setOpenModal(true)}
        />
        <CriarPostModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={handleCreateSuccess}
        />
      </Box>
    </Box>
  );
};

export default PostsPage;