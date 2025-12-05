import { z } from "zod";

export const createUserSchema = z.object({
    nome: z
    .string()
    .min( 3, "O nome deve conter pelo menos 3 caracteres" )
    .max( 100, "O nome deve conter no máximo 100 caracteres" ),

    email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "O Email deve conter no máximo 255 caracteres "),
    
    senha: z
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .max(255, "A senha deve conter no máximo 255 caracteres"),
});

export const updateUsersSchema = createUserSchema.partial();



