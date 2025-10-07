import { Request, Response } from "express";
import { z } from "zod";
import * as UsuarioService from '../Services/UsuarioServices';
import { createUserSchema, updateUsuarioSchema } from "../schema/usuarioSchema";

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = createUserSchema.parse(req.body);
        const usuarioData = {
            name: data.nome,
            email: data.email,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const novoUser = await UsuarioService.create(usuarioData);
        res.status(201).json(novoUser);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.issues });
        }
        if (error.message.includes('e-mail já está em uso')) {
            return res.status(409).json({ error: error.message }); 
            
        }
        res.status(500).json({ error: 'Falha ao criar usuário' });
    }
};

export const getAllusuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await UsuarioService.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar usuários' });
    }
};

export const getusuarioById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await UsuarioService.getById(id);
        if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar usuário' });
    }
};

export const updateusuario = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = updateUsuarioSchema.parse(req.body);
        const usuarioAtualizado = await UsuarioService.update(id, data);
        res.status(200).json(usuarioAtualizado);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.issues });
        }
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao atualizar usuário' });
    }
};

export const deleteusuario = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await UsuarioService.remove(id);
        res.status(204).send();
    } catch (error: any) {
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Falha ao deletar usuário' });
    }
};