import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type ComentarioCreateData = { text: string; autorId: number; postagemId: number; };
type ComentarioUpdateData = { text?: string; };

export const getAllComentarios = async () => {
  return prisma.comentario.findMany({ include: { autor: true, postagem: true } });
};

export const getComentarioById = async (id: number) => {
  return prisma.comentario.findUnique({
    where: { id },
    include: { autor: true, postagem: true },
  });
};

export const createComentario = async (data: ComentarioCreateData) => {
  return prisma.comentario.create({ data });
};

export const updateComentario = async (id: number, data: ComentarioUpdateData) => {
  return prisma.comentario.update({ where: { id }, data });
};

export const deleteComentario = async (id: number) => {
  return prisma.comentario.delete({ where: { id } });
};