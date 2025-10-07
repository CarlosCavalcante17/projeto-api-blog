import prisma from "../lib/prisma";
import { Comentario } from "@prisma/client";

type comentarioCreateData = Omit<Comentario, 'id'>;
type comentarioUpdateData = Partial<Omit<Comentario, 'id' | 'autorId' | 'postagemId'>>;

export const create = async (data: comentarioCreateData): Promise<Comentario> => {
    // Validação das chaves estrangeiras: autor e postagem existem?
    const autor = await prisma.usuario.findUnique({ where: { id: data.autorId } });
    if (!autor) {
        throw new Error('Autor não encontrado');
    }

    const postagem = await prisma.postagem.findUnique({ where: { id: data.postagemId } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }

    return prisma.comentario.create({ data });
};

export const getAll = async () => {
    return prisma.comentario.findMany({
        include: {
            autor: { select: { nome: true } },
            postagem: { select: { title: true } }
        }
    });
};

export const getById = async (id: number) => {
    return prisma.comentario.findUnique({
        where: { id },
        include: {
            autor: true,
            postagem: true
        },
    });
};

export const update = async (id: number, data: comentarioUpdateData): Promise<Comentario> => {
    const comentario = await prisma.comentario.findUnique({ where: { id } });
    if (!comentario) {
        throw new Error('Comentário não encontrado');
    }
    return prisma.comentario.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<Comentario> => {
    const comentario = await prisma.comentario.findUnique({ where: { id } });
    if (!comentario) {
        throw new Error('Comentário não encontrado');
    }
    return prisma.comentario.delete({ where: { id } });
};