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
const res = {
    status: (statusCode) => ({
        json: (data) => ({ statusCode, ...data })
    }),
    end: () => { }

};
export async function GET(req) {
    try {
        await runMiddleware(req, res, isAuthenticatedUser);
        await runMiddleware(req, res, authorizeRoles("admin"));
        dbConnect()
        const query = await req.nextUrl.searchParams;
        let skip = query.get("page") || 0;
        const resPerPage = 10;
        let skipped = resPerPage * (skip - 1)
        
     
        const orderCount = await order.countDocuments();
       
        const orders = await order.find().limit(resPerPage).skip(skipped).populate("user shippingInfo")
        // console.log(orders)
        if(!orders)
            throw new Error("Nothing found!")
        return NextResponse.json({orders, resPerPage, orderCount })
    } catch (error) {
        return NextResponse.json({msg:error.message, success:false},{status:error.statusCode})
    }
}