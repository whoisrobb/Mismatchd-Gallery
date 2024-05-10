import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateUUID } from "@/lib/utils";
import { OrderTable } from "./order-table";


export const UserTable = pgTable("user", {
    userId: varchar("userId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    username: varchar("username").notNull(),
    email: varchar("email").notNull(),
    avatar: varchar("avatar").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const ProductTableRelations = relations(
    UserTable, ({ many }) => {
        return {
            orders: many(OrderTable),
        }
    }
);

export type User = typeof UserTable.$inferSelect;