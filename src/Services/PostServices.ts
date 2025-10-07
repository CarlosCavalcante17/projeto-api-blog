import { prisma } from '../database/prisma';

type PostCreateData = { title: string; content: string; published?: boolean; autorId: number; };
type PostUpdateData = { title?: string; content?: string; published?: boolean; };

export const getAllPosts = async () => {
  return prisma.post.findMany({ include: { autor: true } });
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    include: { autor: true, comentarios: true },
  });
};

export const createPost = async (data: PostCreateData) => {
  return prisma.post.create({ data });
};

export const updatePost = async (id: number, data: PostUpdateData) => {
  return prisma.post.update({ where: { id }, data });
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};