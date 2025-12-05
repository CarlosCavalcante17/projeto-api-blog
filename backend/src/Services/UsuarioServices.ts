import {prisma} from "../database/prisma";
import { users } from "../generated/prisma";
import bcrypt from "bcryptjs";

type usersCreateData = Omit<users, 'id'>;
type usersUpdateData = Partial<usersCreateData>;

async function hashPasswordIfPresent(data: Partial<usersCreateData> | Partial<usersUpdateData>) {
  const key = "senha" in data ? "senha" : "password" in data ? "password" : null;
  if (key && typeof (data as any)[key] === "string") {
    (data as any)[key] = await bcrypt.hash((data as any)[key], 10);
  }
}

export const create = async (data: usersCreateData): Promise<users> => {
    const passwordKey = "senha" in data ? "senha" : "password" in data ? "password" : null;
    if(!passwordKey || !(data as any)[passwordKey]) {
        throw new Error('Senha é obrigatória.');
    }

    const emailEmUso = await prisma.users.findUnique({ where: { email: data.email } });
    if (emailEmUso) {
        throw new Error('Este e-mail já está em uso.');
    }

    await hashPasswordIfPresent(data);
    return prisma.users.create({ data });
};

export const getAll = async () => {
    return prisma.users.findMany({
        select: {
            id: true,
            nome: true,
            email: true,
        }
    });
};

export const getByEmail = async (email: string) => {
    return prisma.users.findUnique({
        where: { email },
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

    await hashPasswordIfPresent(data);

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