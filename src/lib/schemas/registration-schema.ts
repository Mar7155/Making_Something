import { z } from "zod"

export const registrationSchema = z.object({
  fullname: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }).trim(),
  username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }).trim(),
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }).trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra" })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
    .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial" })
    .trim(),
  confirmPassword: z
    .string()
    .trim()
    .refine((data: any) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden"
    }),
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>

