import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import order from '@/Backend/models/order';
import { isAuthenticatedUser2 } from "@/Backend/middlewares/auth2";
import { createEdgeRouter } from "next-connect";

const  router = createEdgeRouter()

router.use(isAuthenticatedUser2).get(async(req)=>{
    try {
      
        dbConnect()
        const query = req.nextUrl.searchParams;
        let skip = query.get("page") || 1;
        const resPerPage = 2;
        let skipped = resPerPage * (skip - 1)


        const orderCount = await order.countDocuments({ user: req?.user?._id });

        const orders = await order.find({ user: req?.user?._id }).limit(resPerPage).skip(skipped).populate("user")
        // console.log(orders)
        if (orders.length < 1)
            throw new Error("Nothing found!")
        return NextResponse.json({ orders, resPerPage, orderCount })
    } catch (error) {
        return NextResponse.json({ msg: error.message, success: false }, { status: error.statusCode })
    }
})
export async function GET(req, ctx) {
   return router.run(req, ctx)
}