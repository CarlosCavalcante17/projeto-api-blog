import { Request, Response } from "express";
import { z } from "zod";
import * as ComentarioService from '../Services/ComentarioServices';
import { createcomentarioSchema, updateComentarioSchema } from "../schema/comentarioSchema";

export const createcomentario = async (req: Request, res: Response) => {
    try {
        const data = createcomentarioSchema.parse(req.body);
        const novoComentario = await ComentarioService.create(data);
        res.status(201).json(novoComentario);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.issues });
        }
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao criar comentário' });
    }
};

export const getAllcomentarios = async (req: Request, res: Response) => {
    try {
        const comentarios = await ComentarioService.getAll();
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar comentários' });
    }
};

export const getcomentarioById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const comentario = await ComentarioService.getById(id);
        if (!comentario) return res.status(404).json({ error: 'Comentário não encontrado' });
        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar comentário' });
    }
};

export const updatecomentario = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = updateComentarioSchema.parse(req.body);
        const comentarioAtualizado = await ComentarioService.update(id, data);
        res.status(200).json(comentarioAtualizado);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.issues });
        }
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao atualizar comentário' });
    }
};

export const deletecomentario = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await ComentarioService.remove(id);
        res.status(204).send();
    } catch (error: any) {
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao deletar comentário' });
    }
};