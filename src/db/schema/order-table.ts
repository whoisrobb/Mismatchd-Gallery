import { generateUUID } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { decimal, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { ProductTable } from "./product-table";


export const OrderTable = pgTable("order", {
    orderId: varchar("orderId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    userId: varchar("userId").references(() => UserTable.userId, { onDelete: 'cascade' }).notNull(),
    productId: varchar("productId").references(() => ProductTable.productId, { onDelete: 'cascade' }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const OrderTableRelations = relations(
    OrderTable, ({ one }) => {
        return {
            user: one(UserTable, {
                fields: [OrderTable.userId],
                references: [UserTable.userId]
            }),
            product: one(ProductTable, {
                fields: [OrderTable.productId],
                references: [ProductTable.productId]
            }),
        }
    }
);

export type Order = typeof OrderTable.$inferSelect;