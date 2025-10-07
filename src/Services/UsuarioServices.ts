import {prisma} from "../database/prisma";
import { Usuario } from "../generated/prisma";

type usuarioCreateData = Omit<Usuario, 'id'>;
type usuarioUpdateData = Partial<usuarioCreateData>;

export const create = async (data: usuarioCreateData): Promise<Usuario> => {
    const emailEmUso = await prisma.usuario.findUnique({ where: { email: data.email } });
    if (emailEmUso) {
        throw new Error('Este e-mail já está em uso.');
    }
    return prisma.usuario.create({ data });
};

export const getAll = async () => {
    return prisma.usuario.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
};

export const getById = async (id: number) => {
    return prisma.usuario.findUnique({
        where: { id },
        include: {
            posts: true,
            comentarios: true,
        }
    });
};

export const update = async (id: number, data: usuarioUpdateData): Promise<Usuario> => {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }
    return prisma.usuario.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<Usuario> => {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }
    return prisma.usuario.delete({ where: { id } });
};