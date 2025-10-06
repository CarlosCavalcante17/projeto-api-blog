import {z} from 'zod';

export const createComentariosSchema = z.object({
    text:z
    .string()
    .min(1, "O comentário não pode ser vazio.")
    .max(2000, "O comentário deve conter no máximo 2000 caracteres"),

    autorId: z
    .number()
    .int().positive(),
})

export const updateCommentSchema = z.object({
  text: z.string().min(1, "O comentário não pode estar vazio.").optional(),
});