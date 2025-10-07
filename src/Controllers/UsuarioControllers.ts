import { Request, Response } from "express";
import { z } from "zod";
import * as UsuarioService from '../Services/UsuarioServices';
import { createUserSchema, updateUsersSchema } from "../schema/usuarioSchema";

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = createUserSchema.parse(req.body);
        const usersData = {
            name: data.nome,
            email: data.email,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const novoUser = await UsuarioService.create(usersData);
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

export const getAllusers = async (req: Request, res: Response) => {
    try {
        const users = await UsuarioService.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar usuários' });
    }
};

export const getusersById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await UsuarioService.getById(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar usuário' });
    }
};

export const updateusers = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = updateUsersSchema.parse(req.body);
        const userAtualizado = await UsuarioService.update(id, data);
        res.status(200).json(userAtualizado);
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

export const deleteUser = async (req: Request, res: Response) => {
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