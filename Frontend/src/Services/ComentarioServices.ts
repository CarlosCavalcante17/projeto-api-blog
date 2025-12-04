import axios from "axios";
import type { Comentario } from "../types/comentario";
import { API_ENDPOINTS } from "../config/Api";

export const getComentarios = async (): Promise<Comentario[]> => {
  const response = await axios.get(API_ENDPOINTS.COMENTARIOS);
  return response.data;
};

export const deleteComentario = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.COMENTARIOS}/${id}`);
};

export const updateComentario = async (id: number, dados: Partial<Comentario>): Promise<Comentario> => {
  const response = await axios.put(`${API_ENDPOINTS.COMENTARIOS}/${id}`, dados, {});
  return response.data;
};

export const createComentario = async (dados: Omit<Comentario, "id">): Promise<Comentario> => {
  const response = await axios.post(API_ENDPOINTS.COMENTARIOS, dados, {});
  return response.data;
};