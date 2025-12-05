import { prisma } from "../database/prisma";
import { comments } from "../generated/prisma";

type commentsCreateData = Omit<comments, 'id' | 'createdAt'>;
type commentsUpdateData = Partial<Omit<comments, 'id' | 'autorId' | 'postagemId' | 'createdAt'>>;

export const create = async (data: commentsCreateData): Promise<comments> => {
    const autor = await prisma.users.findUnique({ where: { id: data.autorId } });
    if (!autor) {
        throw new Error('Autor não encontrado');
    }

    const post = await prisma.posts.findUnique({ where: { id: data.postId } });
    if (!post) {
        throw new Error('Postagem não encontrada');
    }

    return prisma.comments.create({ data });
};

export const getAll = async () => {
    return prisma.comments.findMany({
        include: {
            autor: { select: { nome: true, email: true } },
            post: { select: { titulo: true } }
        }
    });
};

export const getAllByPost = async (postId: number) => {
    return prisma.comments.findMany({
        where: { postId },
        orderBy: { createdAt: "desc" },
        include: {
            autor: { select: { nome: true, email: true } },
        },
    });
};

export const getById = async (id: number) => {
    return prisma.comments.findUnique({
        where: { id },
        include: {
            autor: true,
            post: true
        },
    });
};

export const update = async (id: number, data: commentsUpdateData): Promise<comments> => {
    const comments = await prisma.comments.findUnique({ where: { id } });
    if (!comments) {
        throw new Error('Comentário não encontrado');
    }
    return prisma.comments.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<comments> => {
    const comments = await prisma.comments.findUnique({ where: { id } });
    if (!comments) {
        throw new Error('Comentário não encontrado');
    }
    return prisma.comments.delete({ where: { id } });
};