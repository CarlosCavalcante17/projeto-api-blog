import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUsuario } from "../Services/UserServices";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" as "success" | "error" | "info" | "warning" });

  const validar = () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setSnackbar({ open: true, message: "Preencha todos os campos.", severity: "error" });
      return false;
    }
    if (senha.length < 6) {
      setSnackbar({ open: true, message: "Senha precisa ter ao menos 6 caracteres.", severity: "error" });
      return false;
    }
    if (senha !== confirm) {
      setSnackbar({ open: true, message: "Senhas não conferem.", severity: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validar()) return;
    setLoading(true);
    try {
      const novo = { nome: nome.trim(), email: email.trim(), senha };
      await createUsuario(novo);
      setSnackbar({ open: true, message: "Conta criada. Faça login.", severity: "success" });
      setTimeout(() => navigate("/"), 900);
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.response?.data?.message ?? "Erro ao criar usuário.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3} bgcolor="background.default">
      <Paper sx={{ width: 420, p: 4 }} elevation={3}>
        <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">Criar conta</Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} size="small" fullWidth />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} size="small" fullWidth type="email" />
          <TextField label="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} size="small" fullWidth type="password" />
          <TextField label="Confirmar senha" value={confirm} onChange={(e) => setConfirm(e.target.value)} size="small" fullWidth type="password" />

          <Box display="flex" gap={1} justifyContent="space-between" mt={1}>
            <Button variant="text" onClick={() => navigate("/")}>Voltar</Button>
            <Button type="submit" variant="contained" disabled={loading}>Registrar</Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;