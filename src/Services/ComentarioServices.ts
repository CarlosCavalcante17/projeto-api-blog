import { prisma } from '../database/prisma';
 

type ComentarioCreateData = { text: string; autorId: number; postagemId: number; };
type ComentarioUpdateData = { text?: string; };

export const getAllComentarios = async () => {
  return prisma.comentario.findMany({ include: { autor: true, post: true } });
};

export const getComentarioById = async (id: number) => {
  return prisma.comentario.findUnique({
    where: { id },
    include: { autor: true, post: true },
  });
};

export const createComentario = async (data: ComentarioCreateData) => {
  return prisma.comentario.createComentario({ data });
};

export const updateComentario = async (id: number, data: ComentarioUpdateData) => {
  return prisma.comentario.update({ where: { id }, data });
};

export const deleteComentario = async (id: number) => {
  return prisma.comentario.delete({ where: { id } });
};