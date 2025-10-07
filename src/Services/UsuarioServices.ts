import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type UsuarioCreateData = { name: string; email: string; };
type UsuarioUpdateData = { name?: string; email?: string; };

export const getAllUsuarios = async () => {
  return prisma.usuario.findMany();
};

export const getUsuarioById = async (id: number) => {
  return prisma.usuario.findUnique({
    where: { id },
    include: { postagens: true, comentarios: true },
  });
};

export const createUsuario = async (data: UsuarioCreateData) => {
  return prisma.usuario.create({ data });
};

export const updateUsuario = async (id: number, data: UsuarioUpdateData) => {
  return prisma.usuario.update({ where: { id }, data });
};

export const deleteUsuario = async (id: number) => {
  return prisma.usuario.delete({ where: { id } });
};