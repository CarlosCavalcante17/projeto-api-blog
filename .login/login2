import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { z } from "zod";
import axios from "axios";

const emailSchema = z.email();
const passwordSchema = z.string().min(4);

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msgSucesso, setMsgSucesso] = useState<string>("");
  const [msgErro, setMsgErro] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (
    email: string
  ): { isValid: boolean; message: string } => {
    if (!email.trim()) {
      //early return
      return {
        isValid: false,
        message: "Email é obrigatório",
      };
    }
    const resultado = emailSchema.safeParse(email);
    return {
      isValid: resultado.success,
      message: resultado.success ? "" : "Email inválido",
    };
  };

  const validatePassword = (
    password: string
  ): { isValid: boolean; message: string } => {
    if (!password.trim()) {
      //early return
      return {
        isValid: false,
        message: "Senha é obrigatória",
      };
    }
    const resultado = passwordSchema.safeParse(password);
    return {
      isValid: resultado.success,
      message: resultado.success ? "" : "Senha com menos de 4 caracteres",
    };
  };

  const inputsValidos: boolean =
    validateEmail(email).isValid && validatePassword(password).isValid;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url: string = "http://localhost:3333/login";

    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        email: email,
        senha: password,
      });

      const dadosSecretario = response.data; //body da resposta http
      setMsgSucesso(`Bem vindo(a), ${dadosSecretario.nome}!`);
      setMsgErro("");
      // Redireciona para Home após login bem-sucedido
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error: any) {
      let mensagem = "Erro ao realizar login. Verifique suas credenciais.";
      if (error?.response?.data?.message) {
        mensagem = error.response.data.message;
      }
      setMsgErro(mensagem);
      setMsgSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={2} sx={{ p: 3, width: 320 }}>
        <Box textAlign="center" mb={2}>
          <LoginIcon sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
          <Typography variant="h6" component="h2" fontWeight={600} mb={1}>
            Bem-vindo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Faça login para acessar o sistema
          </Typography>
        </Box>
        {msgSucesso && <Alert>{msgSucesso}</Alert>}
        {msgErro && <Alert severity="error">{msgErro}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={!validateEmail(email).isValid}
            helperText={validateEmail(email).message}
            disabled={isLoading}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            error={!validatePassword(password).isValid}
            helperText={validatePassword(password).message}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!inputsValidos || isLoading}
          >
            {isLoading ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} color="inherit" />
                Carregando...
              </Box>
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;