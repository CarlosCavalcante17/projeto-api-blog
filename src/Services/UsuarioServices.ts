import prisma from "../lib/prisma";
import { Usuario } from "@prisma/client";

// Para criar um usuário, omitimos apenas o 'id', que é gerado pelo banco.
type usuarioCreateData = Omit<Usuario, 'id'>;
// Para atualizar, tornamos todos os campos opcionais.
type usuarioUpdateData = Partial<usuarioCreateData>;

export const create = async (data: usuarioCreateData): Promise<Usuario> => {
    // Validação extra para garantir que o email não está em uso
    const emailEmUso = await prisma.usuario.findUnique({ where: { email: data.email } });
    if (emailEmUso) {
        throw new Error('Este e-mail já está em uso.');
    }
    return prisma.usuario.create({ data });
};

export const getAll = async () => {
    return prisma.usuario.findMany({
        // Opcional: Ocultar dados sensíveis ou desnecessários na listagem geral
        select: {
            id: true,
            nome: true,
            email: true,
        }
    });
};

export const getById = async (id: number) => {
    return prisma.usuario.findUnique({
        where: { id },
        // Ao buscar um único usuário, incluímos suas postagens e comentários
        include: {
            postagens: true,
            comentarios: true,
        }
    });
};

export const update = async (id: number, data: usuarioUpdateData): Promise<Usuario> => {
    // Garante que o usuário existe antes de tentar atualizar
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }
    return prisma.usuario.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<Usuario> => {
    // Garante que o usuário existe antes de tentar deletar
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }
    return prisma.usuario.delete({ where: { id } });
};