import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty("Ingresa tu email"),
    password: z.string().nonempty("Ingresa tu contraseña")
});