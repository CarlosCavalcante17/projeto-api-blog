import { prisma } from "../database/prisma";
import { Comentario } from "../generated/prisma";

type comentarioCreateData = Omit<Comentario, 'id' | 'createdAt'>;
type comentarioUpdateData = Partial<Omit<Comentario, 'id' | 'autorId' | 'postagemId' | 'createdAt'>>;

export const create = async (data: comentarioCreateData): Promise<Comentario> => {
    const autor = await prisma.usuario.findUnique({ where: { id: data.autorId } });
    if (!autor) {
        throw new Error('Autor não encontrado');
    }

    const postagem = await prisma.post.findUnique({ where: { id: data.postId } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }

    return prisma.comentario.create({ data });
};

export const getAll = async () => {
    return prisma.comentario.findMany({
        include: {
            autor: { select: { name: true } },
            post: { select: { titulo: true } }
        }
    });
};

export const getById = async (id: number) => {
    return prisma.comentario.findUnique({
        where: { id },
        include: {
            autor: true,
            post: true
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