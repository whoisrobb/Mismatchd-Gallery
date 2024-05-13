import { generateUUID } from "@/lib/utils";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { OrderTable } from "./order-table";
import { ProductTable } from "./product-table";
import { relations } from "drizzle-orm";


export const OrderItemTable = pgTable("orderItem", {
    orderItemId: varchar("orderId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    productId: varchar("productId").references(() => ProductTable.productId).notNull(),
    orderId: varchar("orderId").references(() => OrderTable.orderId).notNull(),
});

export const OrderItemTableRelations = relations(
    OrderItemTable, ({ one }) => {
        return {
            product: one(ProductTable, {
                fields: [OrderItemTable.productId],
                references: [ProductTable.productId]
            }),
            order: one(OrderTable, {
                fields: [OrderItemTable.orderId],
                references: [OrderTable.orderId]
            })
        }
})

export type OrderItem = typeof OrderItemTable.$inferInsert;