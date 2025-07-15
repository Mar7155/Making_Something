import { productContentSchema } from "@/lib/schemas/product-content-schema"
import { file } from "astro/loaders"
import { defineCollection } from "astro:content"

const products = defineCollection({
    loader: file("src/content/products/products.json"),
    schema: productContentSchema
})

export const collections = { products }