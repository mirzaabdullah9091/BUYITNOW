import Stripe from "stripe";
import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import order from "@/Backend/models/order";


const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);



async function getCartItems(line_items) {
    return new Promise((resolve, reject) => {
        let cartItems = [];
        line_items?.data?.forEach(async (item) => {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId;
            cartItems.push({
                product: productId,
                name: product.name,
                price: item.price.unit_amount_decimal / 100,
                quantity: item.quantity,
                image: product.images[0]

            })
            if (cartItems.length === line_items?.data.length)
                resolve(cartItems)
        });
    })
}

export async function POST(req) {
    try {
        dbConnect();
        const rawBody = await req.text();
    const headersList = req.headers;
    const signature = headersList.get("stripe-signature");

        const event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
  
        if (event.type === "checkout.session.completed") {
            const session = event.data.object
            const line_items = await stripe.checkout.sessions.listLineItems(
                event.data.object.id
            )

            const orderItems = await getCartItems(line_items)
            const userId = session.client_reference_id;
            const amountPaid = session.amount_total / 100
            const paymentInfo = {
                id: session.payment_intent,
                status : session.payment_status,
                amountPaid,
                taxPaid: session?.total_details.amount_tax / 100
            }

            const orderData = {
                user : userId,
                shippingInfo : session.metadata.shippingInfo,
                paymentInfo,
                orderItems
            }

            const orderCreated = await order.create(orderData)
            if(!orderCreated)
                throw new Error("Error in placing order!")

        }
        return NextResponse.json({success:true}, {status:201})
    } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, {status:error.statusCode})
    }
}