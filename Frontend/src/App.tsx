import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PerfilUsuarioPage from "./pages/PerfilUsuarioPage";
import Home from "./pages/home";
import ThemeToggleFloating from "./components/ThemeToggleFloating";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import UsuariosPage from "./pages/UsuariosPage";
import PostsPage from "./pages/PostsPage";

function app() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggleFloating toggleColorMode={toggleColorMode} mode={mode} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/perfil/:id" element={<PerfilUsuarioPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/Posts" element={<PostsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default app;