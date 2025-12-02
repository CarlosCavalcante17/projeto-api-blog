import React, { useEffect, useState } from "react";
import type { Paciente } from "../types/paciente";
import { getPacientes, deletePaciente } from "../services/pacienteService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import PacientesTable from "./PacientesTable";
import EditarPacienteModal from "./EditarPacienteModal";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const Pacientes: React.FC = () => {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [pacienteEditando, setPacienteEditando] = useState<Paciente | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getPacientes();
        setPacientes(data);
      } catch (e) {
        setSnackbar({
          open: true,
          message: "Erro ao buscar pacientes.",
          severity: "error",
        });
        console.error(e);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);

    try {
      await deletePaciente(id);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
      setSnackbar({
        open: true,
        message: "Paciente removido com sucesso.",
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Erro ao deletar paciente.",
        severity: "error",
      });
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenEditModal = (paciente: Paciente) => {
    setPacienteEditando(paciente);
  };

  const handleCloseEditModal = () => {
    setPacienteEditando(null);
  };

  const handleSavePaciente = (pacienteAtualizado: Paciente) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === pacienteAtualizado.id ? pacienteAtualizado : p))
    );
    setSnackbar({
      open: true,
      message: "Paciente atualizado com sucesso.",
      severity: "success",
    });
  };

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
          Lista de Pacientes
        </Typography>

        <PacientesTable
          pacientes={pacientes}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={handleOpenEditModal}
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            className="uppercase font-bold"
          >
            Novo Paciente
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

      <EditarPacienteModal
        open={pacienteEditando !== null}
        paciente={pacienteEditando}
        onClose={handleCloseEditModal}
        onSave={handleSavePaciente}
      />
    </Box>
  );
};

export default Pacientes;