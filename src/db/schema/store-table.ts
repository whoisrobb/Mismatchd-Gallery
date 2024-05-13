import { generateUUID } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { ProductTable } from "./product-table";
import { OrderTable } from "./order-table";


export const StoreTable = pgTable("store", {
    storeId: varchar("id")
      .$defaultFn(() => generateUUID())
      .primaryKey(),
    userId: varchar("userId").notNull(),
    name: varchar("name").notNull(),
    description: text("description"),
    slug: text("slug").unique(),
    active: boolean("active").notNull().default(false),
    stripeAccountId: varchar("stripe_account_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
});

export const StoreTableRelations = relations(
    StoreTable, ({ many }) => {
        return {
            products: many(ProductTable),
            orders: many(OrderTable),
        }
    }
);


export type Store = typeof StoreTable.$inferSelect;