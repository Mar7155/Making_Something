import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  active: z.boolean().default(true),
  is_customizable: z.boolean().default(false),
  preview_image_url: z.string().optional(), // URL pública del bucket 'products'
  gallery_images_urls: z.array(z.string()).default([]), // Array de URLs
});

// Extendemos el tipo inferido para agregar campos que SOLO genera la DB (id, created_at)
export type Product = z.infer<typeof productSchema> & {
  id: string;
  created_at: string;
  updated_at: string;
};