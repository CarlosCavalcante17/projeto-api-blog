import axios from "axios";
import type { Post } from "../../types/Post";
import { API_ENDPOINTS } from "../config/Api";

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(API_ENDPOINTS.POSTS);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.POSTS}/${id}`);
};

export const updatePost = async (id: number, dados: Partial<Post>): Promise<Post> => {
  const response = await axios.put(`${API_ENDPOINTS.POSTS}/${id}`, dados, {});
  return response.data;
};

export const createPost = async (dados: Omit<Post, "id">): Promise<Post> => {
  const response = await axios.post(API_ENDPOINTS.POSTS, dados, {});
  return response.data;
};