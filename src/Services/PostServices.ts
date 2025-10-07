import {prisma} from "../database/prisma";
import { Post } from "../generated/prisma";

type PostCreateData = Omit<Post, 'id'>;
type PostUpdateData = Partial<Omit<Post, 'id' | 'autorId'>>;

export const create = async (data: PostCreateData): Promise<Post> => {
    
    const autor = await prisma.usuario.findUnique({ where: { id: data.autorId } });
    if (!autor) {
        throw new Error('Autor não encontrado');
    }
    return prisma.post.create({ data });
};

export const getAll = async () => {
    return prisma.post.findMany({
        orderBy: { id: 'desc' }, 
        include: {
            autor: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });
};

export const getById = async (id: number) => {
    return prisma.post.findUnique({
        where: { id },
        include: {
            autor: true,
            comentarios: true
        },
    });
};

export const update = async (id: number, data: PostUpdateData): Promise<Post> => {
    const postagem = await prisma.post.findUnique({ where: { id } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }
    return prisma.post.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<Post> => {
    const postagem = await prisma.post.findUnique({ where: { id } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }
    return prisma.post.delete({ where: { id } });
};