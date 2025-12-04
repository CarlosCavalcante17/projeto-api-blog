import axios from "axios";
import type {Usuario} from "../types/Usuario";
import { API_ENDPOINTS } from "../config/Api";

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await axios.get(API_ENDPOINTS.USUARIOS);
  return response.data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
    await axios.delete(`${API_ENDPOINTS.USUARIOS}/${id}`);
};

export const updateUsuario = async (id: number, dados: Partial<Usuario>): Promise<Usuario> => {
  const response = await axios.put(`${API_ENDPOINTS.USUARIOS}/${id}`, dados, {});
  return response.data;
};

export const createUsuario = async (dados: Omit<Usuario, "id">): Promise<Usuario> => {
  const response = await axios.post(API_ENDPOINTS.USUARIOS, dados, {});
  return response.data;
};