import { useEffect, useState, useCallback, useMemo } from "react";
import type {Usuario} from "../types/usuario";
import { getUsuarios, deleteUsuario } from "../Services/UserServices.ts";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Button,
    Snackbar,
    Alert,
    Textfield,
    InputAdornment,
    Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import UsuariosTable from "../components/Usuarios/UsuariosTable.tsx";
import EditarPacienteModal from "../components";
import CriarPacienteModal from "../components/pacientes/CriarPacienteModal";
import { useDebounce } from "../hooks/useDebounce";