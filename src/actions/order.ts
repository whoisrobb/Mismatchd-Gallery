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
                store: true
            }
        });

        return orders;

    } catch (err) {
        console.error(err);
    }
}