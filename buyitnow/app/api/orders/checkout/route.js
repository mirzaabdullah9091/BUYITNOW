import { NextResponse } from "next/server";
import Stripe from "stripe";
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";
import { Currency } from "lucide-react";
import product from "@/Backend/models/product";
import { metadata } from "@/app/layout";

const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {

                return reject(result);
            }
            return resolve(result);
        });
    });
}
const res = {
    status: (statusCode) => ({
        json: (data) => ({ statusCode, ...data })
    }),
    end: () => { }

};

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export async function POST(req) {
    try {
        await runMiddleware(req, res, isAuthenticatedUser);
        const body = await req.json();
        // console.log(body, req.user)
        const shippingInfo = body.shippingInfo;
        const line_items = body?.items?.map((items)=>{
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name: items.name,
                        images:[items.image?.url],
                        metadata:{productId: items.product}
                    },
                    unit_amount:items.price * 100
                },
                quantity: items.quantity
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.HOST_URL}/me/orders?order_success=true`,
            cancel_url: `${process.env.HOST_URL}`,
            customer_email: req?.user.email,
            client_reference_id: req?.user._id,
            mode: 'payment',
            metadata: { shippingInfo },
            shipping_options:[{
                shipping_rate:"shr_1PLo36EiFmmcfKq1CROzEqpG"
            }],
            line_items 
        })
        return NextResponse.json({url:session.url})
    } catch (error) {
        return NextResponse.json({error:error.message})
    }
}