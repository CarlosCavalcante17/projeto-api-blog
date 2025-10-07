import { Request, Response } from 'express';
import { z } from 'zod';
import * as postService from '../Services/PostServices';
import { createPostSchema, updatePostSchema } from '../schema/postSchema';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar postagens.' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada.' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar postagem.' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const validatedData = createPostSchema.parse(req.body);
    const newPost = await postService.createPost(validatedData);
    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.issues });
    }
    res.status(500).json({ message: 'Erro ao criar postagem.' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const validatedData = updatePostSchema.parse(req.body);
    const updatedPost = await postService.updatePost(id, validatedData);
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.issues });
    }
    res.status(500).json({ message: 'Erro ao atualizar postagem.' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await postService.deletePost(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar postagem.' });
  }
};