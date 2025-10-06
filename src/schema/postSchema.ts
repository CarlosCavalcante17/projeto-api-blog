import { boolean, number, z } from "zod";

export const createPostSchema = z.object({
  titulo: z
   .string()
   .min(3, "O titulo deve conter no mínimo 3 caracteres.")
   .max(100, "O titulo deve conter no máximo 100 caracteres."),

   conteudo: z
   .string()
   .min(10, "O conteudo deve conter no mínimo 10 caracteres"),

    autorId: z
    .number().int().positive("O ID do autor deve ser um número inteiro positivo"),

});

export const updatePostSchema = createPostSchema.partial();

