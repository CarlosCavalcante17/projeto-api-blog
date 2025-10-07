import prisma from "../lib/prisma";
import { Postagem } from "@prisma/client";

type PostCreateData = Omit<Postagem, 'id'>;
type PostUpdateData = Partial<Omit<Postagem, 'id' | 'autorId'>>;

export const create = async (data: PostCreateData): Promise<Postagem> => {
    
    const autor = await prisma.usuario.findUnique({ where: { id: data.autorId } });
    if (!autor) {
        throw new Error('Autor não encontrado');
    }
    return prisma.postagem.create({ data });
};

export const getAll = async () => {
    return prisma.postagem.findMany({
        orderBy: { id: 'desc' }, 
        include: {
            autor: {
                select: {
                    nome: true,
                    email: true
                }
            }
        }
    });
};

export const getById = async (id: number) => {
    return prisma.postagem.findUnique({
        where: { id },
        include: {
            autor: true,
            comentarios: true
        },
    });
};

export const update = async (id: number, data: PostUpdateData): Promise<Postagem> => {
    const postagem = await prisma.postagem.findUnique({ where: { id } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }
    return prisma.postagem.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<Postagem> => {
    const postagem = await prisma.postagem.findUnique({ where: { id } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }
    return prisma.postagem.delete({ where: { id } });
};