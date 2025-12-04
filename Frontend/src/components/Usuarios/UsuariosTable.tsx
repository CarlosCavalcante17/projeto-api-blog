import React from "react";
import type { User } from "../types/";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface UsuariosTableProps {
  users: User[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (User: User) => void; // Nova função para editar
}

const UsuariosTable: React.FC<UsuariosTableProps> = ({
  users,
  deletingId,
  onDelete,
  onEdit,
}) => {
  return (
    <TableContainer className="mt-4 rounded-lg">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-800">
            {[
              "Nome",
              "Email",
              "Telefone",
              "CPF",
              "Data de Nascimento",
              "Ações",
            ].map((header) => (
              <TableCell
                key={header}
                align="center"
                className="font-bold text-white"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                className="py-6 text-gray-500"
              >
                Nenhum Usuario encontrado.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} hover className="hover:bg-blue-50">
                <TableCell align="center">{user.nome}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <Tooltip title="Editar">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onEdit(user)} // Clicar = abrir modal de edição
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(user.id)}
                        disabled={deletingId === user.id}
                        aria-label={`remover-${user.id}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsuariosTable;