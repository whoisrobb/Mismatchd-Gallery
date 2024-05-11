"use server";

import db from "@/db/drizzle";
import { StoreTable } from "@/db/schema/store-table";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export type CreateStoreProps = {
    name: string,
    description: string,
    userId: string
}


// GET ALL STORES
export const getAllStores = async () => {
    try {
        const allStores = await db.select().from(StoreTable)
        return {
            data: allStores,
            error: 'Something went wrong!'
        }
    } catch (err) {
        return {
            data: null,
            error: 'Something went wrong!'
        }
    }
} 

// CREATE NEW STORE
export const createStore = async (input: CreateStoreProps) => {
    try {    
        const newStore = await db
            .insert(StoreTable)
            .values({
                name: input.name,
                description: input.description,
                userId: input.userId,
                slug: slugify(input.name)
            })
            .returning({
                id: StoreTable.storeId,
                name: StoreTable.name,
            })
            .then((res) => res[0])
                
        revalidatePath('/admin/stores');
    
        return {
            data: newStore,
            error: null,
        }
    } catch (err) {
        return {
            data: null,
            error: 'Something went wrong!'
        }
    }
};