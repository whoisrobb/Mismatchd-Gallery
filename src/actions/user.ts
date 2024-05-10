"use server";

import db from "@/db/drizzle";
import { UserTable } from "@/db/schema";


// GET ALL USERS
export const getAllUsers = async () => {
    return db.select().from(UserTable)
}