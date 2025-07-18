import { z } from "zod";

export const productContentSchema = z.object({
    slug: z.string().min(1).trim(),
    data: z.object({
        id: z.string().min(1).trim(),
        name: z.string().min(1).trim(),
        description: z.string().min(1).trim(),
        price: z.number().positive(),
        previewImg: z.string(),
        imagesUrl: z.array(z.string()),
    }),
}); 