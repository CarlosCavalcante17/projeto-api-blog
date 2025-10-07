import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type PostCreateData = { title: string; content: string; published?: boolean; autorId: number; };
type PostUpdateData = { title?: string; content?: string; published?: boolean; };

export const getAllPosts = async () => {
  return prisma.postagem.findMany({ include: { autor: true } });
};

export const getPostById = async (id: number) => {
  return prisma.postagem.findUnique({
    where: { id },
    include: { autor: true, comentarios: true },
  });
};

export const createPost = async (data: PostCreateData) => {
  return prisma.postagem.create({ data });
};

export const updatePost = async (id: number, data: PostUpdateData) => {
  return prisma.postagem.update({ where: { id }, data });
};

export const deletePost = async (id: number) => {
  return prisma.postagem.delete({ where: { id } });
};