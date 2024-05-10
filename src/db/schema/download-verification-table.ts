import { generateUUID } from "@/lib/utils";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { ProductTable } from "./product-table";
import { relations } from "drizzle-orm";


export const DownloadVerificationTable = pgTable("downloadVerification", {
    downloadId: varchar("downloadId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    productId: varchar("productId").references(() => ProductTable.productId).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const DownloadVerificationTableRelations = relations(
    DownloadVerificationTable, ({ one }) => {
        return {
            product: one(ProductTable, {
                fields: [DownloadVerificationTable.productId],
                references: [ProductTable.productId]
            })
        }
    }
);

export type DownloadVerification = typeof DownloadVerificationTable.$inferSelect;