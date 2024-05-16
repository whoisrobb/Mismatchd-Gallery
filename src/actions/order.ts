"use server";

import { CartProduct } from "@/components/cart/cart-provider";
import db from "@/db/drizzle";
import {
    OrderTable,
    // chatGroups,
    // users,
    // usersToChatGroups,

} from "@/db/schema";
import { eq, inArray } from "drizzle-orm";


// GET ORDERS
export const getOrders = async () => {
    try {
        const orders = await db.select().from(OrderTable)
        return orders
    } catch (err) {
        console.error(err);
    }
}

// CREATE ORDER
export const createOrder = async (cartItems: CartProduct[]) => {
    try {
        const data = await db.insert(OrderTable)
        .values({
            isPaid: true,
            products: cartItems
        })
        .returning();
        // .returning({
        //     orderId: OrderTable.orderId
        // });

        return data;
    } catch (err) {
        console.error(err)
    }
}