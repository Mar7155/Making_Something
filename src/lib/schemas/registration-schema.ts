import { z } from "zod"

export const registrationSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).trim(),
  lastname: z.string().min(2, { message: "Los apellidos deben tener al menos 2 caracteres" }).trim(),
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }).trim(),
  phone: z
    .string()
    .min(10, { message: "El teléfono debe tener al menos 10 dígitos" })
    .regex(/^\d+$/, { message: "El teléfono solo debe contener números" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra" })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
    .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial" })
    .trim(),
  insertAddress: z.boolean().default(false),
  // Campos de dirección opcionales
  direction: z
    .object({
      calle: z.string().optional(),
      numeroExterior: z.coerce.number().optional(),
      numeroInterior: z.coerce.number().optional(),
      colonia: z.string().optional(),
      codigoPostal: z.coerce.number().optional(),
      ciudad: z.string().optional(),
      estado: z.string().optional(),
    })
    .optional(),
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>

