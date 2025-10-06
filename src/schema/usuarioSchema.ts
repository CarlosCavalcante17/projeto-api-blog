import { z } from "zod";

export const createUsuarioSchema = z.object({
    nome: z
    .string()
    .min( 3, "O nome deve conter pelo menos 3 caracteres" )
    .max( 100, "O nome deve conter no máximo 100 caracteres" ),

    email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "O Email deve conter no máximo 255 caracteres "),
});

export const updateUsuarioSchema = createUsuarioSchema.partial();



