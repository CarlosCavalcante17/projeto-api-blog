import { Request, Response } from "express";
import { date, z } from "zod";
import * as PostagemService from '../Services/PostServices';
import { createPostSchema, updatePostSchema } from "../schema/postSchema";

export const createPost = async (req: Request, res: Response) => {
    try {
        const data = createPostSchema.parse(req.body);
        const now = new Date();
        const postData = {
            ...data,
            createdAt: now,
            updatedAt: now,
            publicado: true 
        };
        const novaPostagem = await PostagemService.create(postData);
        res.status(201).json(novaPostagem);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.issues });
        }
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao criar postagem' });
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const postagens = await PostagemService.getAll();
        res.status(200).json(postagens);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar postagens' });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const postagem = await PostagemService.getById(id);
        if (!postagem) return res.status(404).json({ error: 'Postagem não encontrada' });
        res.status(200).json(postagem);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar postagem' });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = updatePostSchema.parse(req.body);
        const postagemAtualizada = await PostagemService.update(id, data);
        res.status(200).json(postagemAtualizada);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.issues });
        }
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao atualizar postagem' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await PostagemService.remove(id);
        res.status(204).send();
    } catch (error: any) {
        if (error.message.includes('não encontrada')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao deletar postagem' });
    }
};