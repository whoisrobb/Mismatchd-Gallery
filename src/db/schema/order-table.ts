import { generateUUID } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { boolean, decimal, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { StoreTable } from "./store-table";
import { OrderItemTable } from "./order-item-table";
import { ProductTable } from "./product-table";


export const OrderTable = pgTable("order", {
    orderId: varchar("orderId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    // userId: varchar("userId").notNull(),
    // storeId: varchar("storeId").references(() => StoreTable.storeId, { onDelete: 'cascade' }).notNull(),
    isPaid: boolean("isPaid").default(false),
    address: text("address").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const OrderTableRelations = relations(
    OrderTable, ({ one, many }) => {
        return {
            // store: one(StoreTable, {
            //     fields: [OrderTable.storeId],
            //     references: [StoreTable.storeId]
            // }),
            orderItems: many(OrderItemTable),
            products: many(ProductTable),
        }
    }
);

export type Order = typeof OrderTable.$inferSelect;