import {prisma} from "../database/prisma";
import { posts } from "../generated/prisma";

type postsCreateData = Omit<posts, 'id'>;
type postsupdateData = Partial<Omit<posts, 'id' | 'autorId'>>;

export const create = async (data: postsCreateData): Promise<posts> => {
    
    const autor = await prisma.users.findUnique({ where: { id: data.autorId } });
    if (!autor) {
        throw new Error('Autor não encontrado');
    }
    return prisma.posts.create({ data });
};

export const getAll = async () => {
    try {
        return await prisma.posts.findMany({
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
    } catch (error: any) {
        console.error('Erro ao buscar posts:', error);
        throw new Error('Erro ao buscar posts: ' + error.message);
    }
};

export const getById = async (id: number) => {
    return prisma.posts.findUnique({
        where: { id },
        include: {
            autor: true,
            comentarios: true
        },
    });
};

export const update = async (id: number, data: postsupdateData): Promise<posts> => {
    const postagem = await prisma.posts.findUnique({ where: { id } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }
    return prisma.posts.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<posts> => {
    const postagem = await prisma.posts.findUnique({ where: { id } });
    if (!postagem) {
        throw new Error('Postagem não encontrada');
    }
    return prisma.posts.delete({ where: { id } });
};