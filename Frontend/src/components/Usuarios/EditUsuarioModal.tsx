import React, { useState } from "react";
import type { User } from "../types/User";
import { EditarUser } from "../";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface EditarUserModalProps {
  open: boolean;
  User: User | null;
  onClose: () => void;
  onSave: (UserAtualizado: User) => void;
}
const EditarUserModal: React.FC<EditarUserModalProps> = ({
  open,
  User,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<User>(
    User || {
      id: 0,
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      dataNascimento: "",
    }
  );

  const [salvando, setSalvando] = useState(false);

  React.useEffect(() => {
    if (User && open) {
      setFormData({
        ...User,
        dataNascimento: User.dataNascimento?.split("T")[0] || "",
      });
    }
  }, [User, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSalvando(true);
    try {
      await updateUser(formData.id, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar User:", error);
      alert("Erro ao salvar User. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Editar User
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome completo"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite o email"
          />

          <TextField
            fullWidth
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            placeholder="Digite o CPF"
          />

          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone || ""}
            onChange={handleInputChange}
            placeholder="Digite o telefone"
          />

          <TextField
            fullWidth
            label="Data de Nascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={salvando}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarUserModal;