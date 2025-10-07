
import { Request, Response } from 'express';
import { z } from 'zod';
import * as comentarioService from '../Services/ComentarioServices';
import { createComentariosSchema, updateComentarioSchema } from '../schema/comentarioSchema';

export const getAllcomentarios = async (req: Request, res: Response) => {
  try {
    const comentarios = await comentarioService.getAllComentarios();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar comentários.' });
  }
};

export const getComentarioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const comentario = await comentarioService.getComentarioById(id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentário não encontrado.' });
    }
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar comentário.' });
  }
};

export const createcomentario = async (req: Request, res: Response) => {
  try {
    const validatedData = createComentariosSchema.parse(req.body);
    const newcomentario = await comentarioService.createComentario(validatedData);
    res.status(201).json(newcomentario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.issues });
    }
    res.status(500).json({ message: 'Erro ao criar comentário.' });
  }
};

export const updatecomentario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const validatedData = updateComentarioSchema.parse(req.body);
    const updatedcomentario = await comentarioService.updateComentario(id, validatedData);
    res.status(200).json(updatedcomentario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.issues });
    }
    res.status(500).json({ message: 'Erro ao atualizar comentário.' });
  }
};

export const deletecomentario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await comentarioService.deleteComentario(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar comentário.' });
  }
};