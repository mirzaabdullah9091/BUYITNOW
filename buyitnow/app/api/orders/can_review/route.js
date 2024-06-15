import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";

import order from "@/Backend/models/order";

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


export async function GET(req, ctx){
    try{
        dbConnect()
        await runMiddleware(req, res, isAuthenticatedUser);
        const query = await req.nextUrl.searchParams;
        const id = query.get("productId");
        
        const orders = await order.find({
            user: req?.user?._id,
            "orderItems.product": id,
          });
       
          let canReview = orders?.length >= 1 ? true : false;
          return NextResponse.json({
            success:true,
            canReview
        }); 
    
    }
    catch(error){
        console.error("Error:", error);
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
    }
      
}