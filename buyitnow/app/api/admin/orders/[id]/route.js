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
        let id = req.url.split("/")
       
        const orders = await order.findById(id[id.length-1]).populate("user shippingInfo")
// console.log(orders)
        if(!orders)
            return  NextResponse.json({msg:"No order found against this ID ", success:false},{status:404})
            
        return NextResponse.json({ orders })
    } catch (error) {
        return NextResponse.json({msg:error.message, success:false},{status:error.statusCode})
    }
}

export async function PUT(req){
    try {
        await runMiddleware(req, res, isAuthenticatedUser);
        await runMiddleware(req, res, authorizeRoles("admin"));
        dbConnect()
        let id = req.url.split("/");
        let orderstatus = await req.json()
        // console.log(orderstatus)
        let orderFound = await order.findById(id[id.length-1])
        if(!orderFound)
            return  NextResponse.json({msg:"No order found against this ID ", success:false},{status:404})
        const updatedOrder = await order.findByIdAndUpdate(id[id.length-1],{orderStatus : orderstatus.orderStatus })
        // console.log(updatedOrder)
        if(!updatedOrder)
            return  NextResponse.json({msg:"failed to update order ", success:false},{status:500})

        return NextResponse.json({success:true, updatedOrder})
    }catch(error){
        console.log(error)
        return NextResponse.json({msg:error.message, success:false},{status:error.statusCode}) 
    }
}

export async function DELETE(request){
    try {
    await runMiddleware(request, res, isAuthenticatedUser)
    await runMiddleware(request, res, authorizeRoles("admin"))
    dbConnect();
    const id = request.url.split("/");
    const orderFound = await order.findById(id[id.length - 1])
    if(!orderFound){
        return NextResponse.json({
            success: false,
            msg: "Order not found!",
        },{status:404});
    }
  
    let deletedOrder  = await order.findByIdAndDelete(id[id.length - 1])
    if(!deletedOrder){
        throw new Error("Error in deleting order. Please try agauin later")
    }

    return NextResponse.json({
        success:true,
        msg:"Successfully deleted"
    });
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
    }
}