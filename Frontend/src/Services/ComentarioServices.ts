export const getComentariosByPost = async (postId: number): Promise<comments[]> => {
  const response = await axios.get(`${API_ENDPOINTS.COMENTARIOS}/post/${postId}`);
  return response.data;
};
import axios from "axios";
import type { comments } from "../../types/Comentario";
import { API_ENDPOINTS } from "../config/Api";


export const getComentarios = async (): Promise<comments[]> => {
  const response = await axios.get(API_ENDPOINTS.COMENTARIOS);
  return response.data;
};

export const deleteComentario = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.COMENTARIOS}/${id}`);
};

export const updateComentario = async (id: number, dados: Partial<comments>): Promise<comments> => {
  const response = await axios.put(`${API_ENDPOINTS.COMENTARIOS}/${id}`, dados, {});
  return response.data;
};

export const createComentario = async (dados: Omit<comments, "id">): Promise<comments> => {
  const response = await axios.post(API_ENDPOINTS.COMENTARIOS, dados, {});
  return response.data;
};