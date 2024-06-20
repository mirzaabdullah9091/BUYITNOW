import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import order from '@/Backend/models/order';
import { authorizeRoles, isAuthenticatedUser } from "@/Backend/middlewares/auth";



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

export async function GET(req) {
    try {
        const res = new NextResponse()
        await runMiddleware(req, res, isAuthenticatedUser);
        await runMiddleware(req, res, authorizeRoles("admin"));
       
        dbConnect()
        // console.log(req)
        const query = await req.nextUrl.searchParams;
        let skip = query.get("page") || 1;
        const resPerPage = 10;
        let skipped = resPerPage * (skip - 1)
    // console.log(skipped)
     
        const orderCount = await order.countDocuments();
       
        const orders = await order.find().limit(resPerPage).skip(skipped).populate("user shippingInfo")
        // console.log(orders)
        if(!orders || orders.length < 1)
            throw new Error("Nothing found!")
        return  NextResponse.json({orders, resPerPage, orderCount })
    } catch (error) {
        return new NextResponse.json({msg:error.message, success:false},{status:error.statusCode})
    }
}