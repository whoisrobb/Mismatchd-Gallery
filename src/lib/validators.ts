import { z } from "zod";

export const subcategorySchema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
});

export const storeSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
})

export const productSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(255),
    category: z.string().min(3).max(50),
    subCategory: z.string().min(3).max(50),
    price: z.string(),
    inventory: z.string(),
    tags: z.string().min(3).max(50),
})