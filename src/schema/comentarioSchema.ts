import {date, z} from 'zod';

export const createComentariosSchema = z.object({
    text:z
    .string()
    .min(1, "O comentário não pode ser vazio.")
    .max(2000, "O comentário deve conter no máximo 2000 caracteres"),

    autorId: z
    .number()
    .int().positive("O ID do autor deve ser um número positivo."),

    postId: z 
    .number("O Id da postagem é obrigatório.")
    .int().positive("O ID da postagem deve ser um número positivo.")
})

export const updateComentarioSchema = z.object({
  text: z.string().min(1, "O comentário não pode estar vazio.").optional(),
})