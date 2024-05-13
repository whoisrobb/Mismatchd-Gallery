import db from "@/db/drizzle"
import { OrderTable, ProductTable } from "@/db/schema"
import { count, eq } from "drizzle-orm"


// GET TOTAL REVENUE
export const getTotalRevenue = async () => {
    try {
        const paidOrders = await db.query.OrderTable.findMany({
            // where: eq(OrderTable.storeId, storeId),
            with: {
                orderItems: {
                    with: {
                        product: true
                    }
                },
                
            }
        })

        const totalRevenue = paidOrders.reduce((total, order) => {
            const orderTotal = order.orderItems.reduce((orderSum, item) => {
                return orderSum + parseFloat(item.product.price);
            }, 0);

            return total = orderTotal;
        }, 0)

        return totalRevenue;
    } catch (err) {
        console.error(err);
    }
}

// GET SALES COUNT
export const getSalesCount = async () => {
    try {
        const salesCount = await db.select({ count: count() })
            .from(OrderTable)
            .where(eq(OrderTable.isPaid, true))
        
        return salesCount[0];
    } catch (err) {
        console.error(err);
    }
}

// GET STOCK COUNT
export const getStockCount = async () => {
    try {
        const stockCount= await db.select({ count: count() })
            .from(ProductTable)
            // .where(eq(OrderTable.isPaid, true))
        
        return stockCount[0];
    } catch (err) {
        console.error(err);
    }
}