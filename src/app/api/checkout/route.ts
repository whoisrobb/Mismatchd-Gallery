
import { createOrder } from "@/actions/order";
import { CartProduct } from "@/components/cart/cart-provider";
import db from "@/db/drizzle";
import { OrderItemTable, OrderTable, ProductTable } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: Request) {
    const { cartItems } = await req.json();

    if (!cartItems || cartItems.length == 0) {
        return new NextResponse("Product Ids required", { status: 400 })
    };

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    cartItems.forEach((product: CartProduct) => {
        line_items.push({
            quantity: product.quantity,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: product.name,
                },
                unit_amount: Number(product.price) * 100
            }
        })
    });

    const order = await createOrder()
        
    // for (const productId of productIds) {
    //     await db.insert(OrderItemTable)
    //         .values({
    //             orderId: order![0].orderId,
    //             productId: productId,
    //         });
    // }
    
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: { enabled: false },
        success_url: `${process.env.FRONTEND_STORE_URL}/products?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/products?canceled=1`,
        metadata: {
            orderId: order![0].orderId
        }
    });

    return NextResponse.json({ url: session.url })
}