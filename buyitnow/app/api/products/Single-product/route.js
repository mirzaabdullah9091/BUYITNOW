import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import product from "@/Backend/models/product";
export async function GET(request) {
    dbConnect()
    let data = await request.nextUrl.searchParams
    let id = data.get("id")
    if(!id){
        throw new Error("Something went wrong")
    }
    try {
        let getproduct = await product.findById(id)
        // console.log(getproduct)
        if(!getproduct){
            throw new Error("Product not found")
        }
        return NextResponse.json({success:true, msg:"done", product:getproduct},{status:200})
    } catch (error) {
        return NextResponse.json({success:false, msg:"Not done", error:error},{status:404})
    }
    
  

   
}