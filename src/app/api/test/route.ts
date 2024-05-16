import { createOrder } from "@/actions/order";
import db from "@/db/drizzle";
import { OrderTable, ProductTable } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: Request) {
    const { productIds } = await req.json();

    const products = await db.query.ProductTable.findMany({
        where: inArray(ProductTable.productId, productIds)
    });
    
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: product.name,
                },
                unit_amount: Number(product.price) * 100
            }
        })
    });
    
    // const order = await createOrder()
        

    // const resp = await db.query.OrderTable.findFirst({
    //     where: eq(OrderTable.orderId, order![0].orderId)
    // })

    // return NextResponse.json(line_items);
}