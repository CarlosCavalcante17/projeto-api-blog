import { Request, Response } from "express";
import { z } from "zod";
import * as UsuarioService from '../Services/UsuarioServices';
import bcrypt from "bcryptjs";

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const login = async (req: Request, res: Response) => {
    try {
        const data = loginSchema.parse(req.body);
        
        // Buscar usuário por email
        const usuario = await UsuarioService.getByEmail(data.email);
        
        if (!usuario) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Comparar senhas
        const senhaValida = await bcrypt.compare(data.senha, usuario.senha);
        
        if (!senhaValida) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Retornar usuário sem a senha
        const { senha, ...usuarioSemSenha } = usuario;
        res.status(200).json(usuarioSemSenha);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Dados inválidos', details: error.issues });
        }
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Falha ao fazer login', details: error.message });
    }
};
