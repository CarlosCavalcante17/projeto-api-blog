import { Request, Response } from 'express';
import { z } from 'zod';
import * as usuarioService from '../Services/UsuarioServices';
import { createUsuarioSchema, updateUsuarioSchema } from '../schema/usuarioSchema';

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

export const getUsuarioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const validatedData = createUsuarioSchema.parse(req.body);
    const newUsuario = await usuarioService.createUsuario(validatedData);
    res.status(201).json(newUsuario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.issues });
    }
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const validatedData = updateUsuarioSchema.parse(req.body);
    const updatedUsuario = await usuarioService.updateUsuario(id, validatedData);
    res.status(200).json(updatedUsuario);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.issues });
    }
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await usuarioService.deleteUsuario(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};