import { z } from "zod";

export const productSchema = z.object({
    slug: z.string().min(1).trim(),
    data: z.object({
        id: z.string().min(1).trim(),
        name: z.string().min(1).trim(),
        description: z.string().min(1).trim(),
        price: z.number().positive(),
        imageUrl: z.string(),
    }),
}); 