import { useEffect, useState, useCallback, useMemo } from "react";
import type { user } from "../../types/Usuario.ts";
import { getUsuarios, deleteUsuario } from "../Services/UserServices.ts";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Button,
    Snackbar,
    Alert,
    TextField,
    InputAdornment,
    Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import UsuariosTable from "../components/Usuarios/UsuariosTable";
import EditUsuarioModal from "../components/Usuarios/EditUsuarioModal";
import CriarUsuarioModal from "../components/Usuarios/CriarUsuarioModal";
import { useDebounce } from "../hooks/useDebounce";

type SnackbarState = {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
};

export const UsuariosPage = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<user[]>([]);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: "",
        severity: "info",
    });
    const [usuarioEditando, setUsuarioEditando] = useState<user | null>(null);
    const [abrirModalCriar, setAbrirModalCriar] = useState<boolean>(false);

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setSnackbar({
                    open: true,
                    message: "Erro ao buscar usuários.",
                    severity: "error",
                });
            }
        };

        carregarUsuarios();
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        setDeletingId(id);

        try {
            await deleteUsuario(id);
            setUsuarios((prev) => prev.filter((u) => u.id !== id));
            setSnackbar({
                open: true,
                message: "Usuário removido com sucesso.",
                severity: "success",
            });
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            setSnackbar({
                open: true,
                message: "Erro ao deletar usuário.",
                severity: "error",
            });
        } finally {
            setDeletingId(null);
        }
    }, []);

    const handleOpenEditModal = useCallback((usuario: user) => {
        setUsuarioEditando(usuario);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setUsuarioEditando(null);
    }, []);

    const handleSaveUsuario = useCallback((usuarioAtualizado: user) => {
        setUsuarios((prev) =>
            prev.map((u) => (u.id === usuarioAtualizado.id ? usuarioAtualizado : u))
        );
        setSnackbar({
            open: true,
            message: "Usuário atualizado com sucesso.",
            severity: "success",
        });
    }, []);

    const handleSucessoCriarUsuario = useCallback((novoUsuario: user) => {
        setUsuarios((prev) => [...prev, novoUsuario]);
        setSnackbar({
            open: true,
            message: "Usuário cadastrado com sucesso.",
            severity: "success",
        });
    }, []);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const usuariosFiltrados = useMemo(() => {
        if (!debouncedSearchTerm.trim()) return usuarios;

        const termoBusca = debouncedSearchTerm.toLowerCase().trim();

        return usuarios.filter((usuario) => {
            return (
                usuario.nome.toLowerCase().includes(termoBusca) ||
                usuario.email.toLowerCase().includes(termoBusca)
            );
        });
    }, [usuarios, debouncedSearchTerm]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
            p={3}
        >
            <Paper
                elevation={3}
                sx={(theme) => ({
                    width: "100%",
                    maxWidth: 1000,
                    p: 3,
                    position: "relative",
                    bgcolor:
                        theme.palette.mode === "dark" ? "#242424" : "background.paper",
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                })}
            >
                <IconButton
                    aria-label="voltar"
                    onClick={() => navigate("/home")}
                    size="small"
                    sx={{ position: "absolute", left: 16, top: 16 }}
                >
                    <ArrowBackIcon fontSize="small" />
                </IconButton>

                <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
                    Lista de Usuários
                </Typography>

                <Box mb={3}>
                    <TextField
                        fullWidth
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        size="small"
                    />
                    {debouncedSearchTerm && (
                        <Box mt={1} display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                                Resultados encontrados:
                            </Typography>
                            <Chip
                                label={usuariosFiltrados.length}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                            {usuariosFiltrados.length !== usuarios.length && (
                                <Typography variant="body2" color="text.secondary">
                                    de {usuarios.length} total
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>

                <UsuariosTable
                    users={usuariosFiltrados}
                    deletingId={deletingId}
                    onDelete={handleDelete}
                    onEdit={handleOpenEditModal}
                />

                <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        className="uppercase font-bold"
                        onClick={() => setAbrirModalCriar(true)}
                    >
                        Novo Usuário
                    </Button>
                </Box>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                        severity={snackbar.severity}
                        sx={{ width: "100%" }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Paper>

            <EditUsuarioModal
                open={usuarioEditando !== null}
                user={usuarioEditando}
                onClose={handleCloseEditModal}
                onSave={handleSaveUsuario}
            />

            <CriarUsuarioModal
                open={abrirModalCriar}
                onClose={() => setAbrirModalCriar(false)}
                onSuccess={handleSucessoCriarUsuario}
            />
        </Box>
    );
};

export default UsuariosPage;