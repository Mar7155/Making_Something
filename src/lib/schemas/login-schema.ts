import { z } from "astro:content";

export const loginSchema = z.object({
    email: z.string().nonempty("Ingresa tu email"),
    password: z.string().nonempty("Ingresa tu contraseña")
});