import { z } from "zod";

export const storeSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
})

export const productSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
    category: z.string().min(3).max(255),
    subcategory: z.string().min(3).max(255),
    price: z.string().default('0'),
    inventory: z.string().default('0'),
    tags: z.string().min(3).max(50),
})

export const categorySchema = z.object({
    title: z.string().min(3).max(50),
})

export const subcategorySchema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
});