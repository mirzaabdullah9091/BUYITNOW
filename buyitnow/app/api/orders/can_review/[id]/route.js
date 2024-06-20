
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


export async function GET(req){
    try{
        dbConnect()
        await runMiddleware(req, res, isAuthenticatedUser);
        let id = req.url.split("/")
        // console.log(id)
        const orders = await order.find({
            user: req?.user?._id,
            "orderItems.product": id[id.length-1],
          });
        // console.log(orders)
       if(orders.length < 1){
       return NextResponse.json({
        success:false,
        canReview:false}
    )
       }
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