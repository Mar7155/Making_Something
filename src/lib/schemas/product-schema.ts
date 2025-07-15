import { z } from 'zod'

export const ProductSchema = z.object({
    id: z.string().min(1).trim(),
    name: z.string().min(1).trim(),
    description: z.string().min(1).trim(),
    price: z.number().positive(),
    previewImg: z.string(),
    imagesUrl: z.array(z.string()),
})