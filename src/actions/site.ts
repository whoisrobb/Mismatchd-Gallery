"use server";

import db from "@/db/drizzle";
import { CategoryTable, SubcategoryTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


// GET ALL CATEGORIES
export const getCategories = async () => {
    try {
        const categories = await db.query.CategoryTable.findMany({
            with: {
                subcategories: true
            }
        })

        return categories;
    } catch (err) {
        console.error(err)
    }
};

// CREATE CATEGORY
export const createCategory = async (title: string) => {
    try {
        const category = await db.insert(CategoryTable)
            .values({
                title
            })
            .returning({
                title: CategoryTable.title
            })
            
            revalidatePath('/dashboard/site');

            return category;
    } catch (err) {
        console.error(err)
    }
};

// CREATE SUBCATEGORY
export const createSubcategory = async (
    { title, description, categoryId }:
    { title: string, description: string, categoryId: string }
) => {
    try {
        const subcategory = db.insert(SubcategoryTable)
            .values({ title, description, categoryId })
            .returning({
                title: SubcategoryTable.title
            });

            revalidatePath('/dashboard/site');

            return subcategory;
    } catch (err) {
        console.error(err)
    }
};

// DELETE CATEGORY
export const deleteSubcategory = async (subcategoryId: string) => {
    try {
        await db.delete(SubcategoryTable)
            .where(eq(SubcategoryTable.subcategoryId, subcategoryId))
            
            revalidatePath('/dashboard/site');

            return "Deleted successfully";
    } catch (err) {
        console.error(err)
    }
};

// DELETE CATEGORY
export const deleteCategory = async (categoryId: string) => {
    try {
        await db.delete(CategoryTable)
            .where(eq(CategoryTable.categoryId, categoryId))
            
            revalidatePath('/dashboard/site');

            return "Deleted successfully";
    } catch (err) {
        console.error(err)
    }
};