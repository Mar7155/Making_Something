import { z } from "astro:content";

export const productSchema = z.object({
    id: z.string().min(1).trim(),
    slug: z.string().min(1).trim(),
    data: z.object({
        name: z.string().min(1).trim(),
        description: z.string().min(1).trim(),
        price: z.number().positive(),
        imageUrl: z.string(),
    }),
}); 