"use server";

import db from "@/db/drizzle";
import { ProductTable } from "@/db/schema";
import { arrayContained, arrayContains, eq, inArray } from "drizzle-orm";
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

// GET STORE PRODUCTS
export const getStoreProducts = async (storeId: string) => {
    try {
        const storeProducts = await db.query.ProductTable.findMany({
            where: eq(ProductTable.storeId, storeId)
        });

        return storeProducts;
    } catch (err) {
        console.error(err)
    }
};

// GET FEATURED PRODUCTS
export const getFeaturedProducts = async () => {
    try {
        const products = await db.select()
            .from(ProductTable)
            .limit(5)
            // .where(arrayContains(ProductTable.tags, ['featured']))

        return products;
    } catch (err) {
        console.error(err);
    }
};