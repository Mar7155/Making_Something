import { z } from 'zod';

export const shippingSchema = z.object({
    full_name: z.string({message: "Ingresa tu nombre completo"}).min(3, {message: "El nombre debe tener al menos 3 caracteres"}),
    email: z.string({message: "El correo es requerído"}).email({message: "Ingresa un correo válido"}),
    phone: z.number({message: "Tu numero es requerido"}),
    street: z.string({message: 'La calle es requerida'}).min(3, {message: 'La calle debe tener al menos 3 caracteres'}),
    num_ext: z.coerce.string({message: 'El número exterior es requerido'}).min(1, {message: 'El número exterior debe tener al menos 1 carácter'}),
    num_int: z.coerce.number().optional(),
    district: z.string({message: 'La colonia es requerida'}).min(3, {message: 'La colonia debe tener al menos 3 caracteres'}),
    zip_code: z.coerce.number({message: 'El código postal es requerido'}).min(10000, {message: "ingresa un código postal válido"}),
    city: z.string({message: 'La ciudad es requerida'}).min(3, {message: 'La ciudad debe tener al menos 3 caracteres'}),
    state: z.string({message: 'El estado es requerido'}).min(3, {message: 'El estado debe tener al menos 3 caracteres'}),
})

export type ShippingFormValues = z.infer<typeof shippingSchema>