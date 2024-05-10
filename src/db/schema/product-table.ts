import { generateUUID } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { decimal, integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { OrderTable } from "./order-table";
import { DownloadVerificationTable } from "./download-verification-table";


export const ProductTable = pgTable("product", {
    productId: varchar("productId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    name: varchar("name").notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    images: json("images").$type<string[] | null>().default(null),
    inventory: integer("inventory").notNull().default(0),
    rating: integer("rating").notNull().default(0),
    tags: json("tags").$type<string[] | null>().default(null),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const ProductTableRelations = relations(
    ProductTable, ({ many }) => {
        return {
            orders: many(OrderTable),
            DownloadVerifications: many(DownloadVerificationTable)
        }
    }
);

export type Product = typeof ProductTable.$inferSelect;