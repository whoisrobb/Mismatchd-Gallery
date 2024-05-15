"use server";

import db from "@/db/drizzle";
import { OrderTable } from "@/db/schema";
import { eq } from "drizzle-orm";


// GET ORDERS
export const getOrders = async () => {
    try {
        const orders = await db.query.OrderTable.findMany({
            // where: eq(OrderTable.storeId, storeId),
            with: {
                orderItems: {
                    with: {
                        product: true
                    },
                },
                // store: true
            }
        });

        return orders;

    } catch (err) {
        console.error(err);
    }
}

// CREATE ORDER
export const createOrder = async () => {
    try {
        const data = await db.insert(OrderTable)
        .values({
            isPaid: false,
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