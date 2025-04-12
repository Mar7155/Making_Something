import { productSchema } from "@/lib/schemas/product-schema"
import { file } from "astro/loaders"
import { defineCollection } from "astro:content"

const products = defineCollection({
    loader: file("src/content/products/products.json"),
    schema: productSchema
})

export const collections = { products }