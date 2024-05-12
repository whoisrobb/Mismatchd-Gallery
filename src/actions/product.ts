"use server";

import db from "@/db/drizzle";
import { ProductTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

type ProductData = {
    name: string,
    description: string,
    storeId: string,
    price: string,
    inventory: number,
    tags: string[] | null,
    images: string[] | null,
}

// CREATE SINGLE PRODUCT
export const createProduct = async (productData: ProductData) => {
    try {
        const product = await db
            .insert(ProductTable)
            .values(productData)
            .returning({
                name: ProductTable.name,
            })
            .then((res) => res[0])
                
        revalidatePath('/admin/stores');
        return product;

    } catch (err) {
        console.error(err)
    }
}