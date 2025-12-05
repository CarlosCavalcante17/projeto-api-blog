import { Request, Response } from "express";
import { z } from "zod";
import * as UsuarioService from '../Services/UsuarioServices';
import { createUserSchema, updateUsersSchema } from "../schema/usuarioSchema";

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = createUserSchema.parse(req.body);
        const usersData = {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
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
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Falha ao criar usuário', details: error.message });
    }
};

export const getAllusers = async (req: Request, res: Response) => {
    try {
        const users = await UsuarioService.getAll();
        res.status(200).json(users);
    } catch (error: any) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Falha ao buscar usuários', details: error.message });
    }
};

export const getusersById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        const user = await UsuarioService.getById(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(user);
    } catch (error: any) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Falha ao buscar usuário', details: error.message });
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
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Falha ao atualizar usuário', details: error.message });
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
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Falha ao deletar usuário', details: error.message });
    }
};