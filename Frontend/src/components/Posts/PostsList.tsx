import React, {useEffect, useState} from "react";
import type { Post } from "../../../types/Post";
import { getPosts, deletePost } from "../../Services/PostServices";
import PostCard from "./postCard";
import ComentariosList from "./ComentariosList";
import {
    Box,
    CircularProgress,
    Typography,
    Button,
    Stack,
} from "@mui/material";

interface PostsListProps {
    onEdit?: (post: Post) => void;
    onCreate?: () => void;
}

const PostsList: React.FC<PostsListProps> = ({ onEdit, onCreate }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (err: any) {
            setError(err?.message || "Erro ao carregar posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Deseja realmente excluir este post?");
        if (!confirmDelete) return;
        try {
            await deletePost(id);
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            alert("Erro ao excluir post. Tente novamente.");
            console.error(err);
        }
    };

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Posts</Typography>
                <Button variant="contained" onClick={() => onCreate && onCreate()}>
                    Novo Post
                </Button>
            </Stack>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {error && !loading && (
                <Box textAlign="center" mt={4}>
                    <Typography color="error" mb={2}>
                        {error}
                    </Typography>
                    <Button variant="outlined" onClick={fetchPosts}>
                        Tentar novamente
                    </Button>
                </Box>
            )}

            {!loading && !error && (
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
                    {posts.map((post) => (
                        <Box key={post.id} mb={4}>
                            <PostCard
                                post={post}
                                onEdit={(p) => onEdit && onEdit(p)}
                                onDelete={() => handleDelete(post.id)}
                            />
                            <ComentariosList post={post} userId={parseInt(localStorage.getItem("userId") || "0")} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default PostsList;