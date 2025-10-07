import {prisma} from "../database/prisma";
import { users } from "../generated/prisma";

type usersCreateData = Omit<users, 'id'>;
type usersUpdateData = Partial<usersCreateData>;

export const create = async (data: usersCreateData): Promise<users> => {
    const emailEmUso = await prisma.users.findUnique({ where: { email: data.email } });
    if (emailEmUso) {
        throw new Error('Este e-mail já está em uso.');
    }
    return prisma.users.create({ data });
};

export const getAll = async () => {
    return prisma.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
};

export const getById = async (id: number) => {
    return prisma.users.findUnique({
        where: { id },
        include: {
            posts: true,
            comentarios: true,
        }
    });
};

export const update = async (id: number, data: usersUpdateData): Promise<users> => {
    const users = await prisma.users.findUnique({ where: { id } });
    if (!users) {
        throw new Error('Usuário não encontrado');
    }
    return prisma.users.update({
        where: { id },
        data,
    });
};

export const remove = async (id: number): Promise<users> => {
    const users = await prisma.users.findUnique({ where: { id } });
    if (!users) {
        throw new Error('Usuário não encontrado');
    }
    return prisma.users.delete({ where: { id } });
};