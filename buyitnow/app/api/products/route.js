import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import product from "@/Backend/models/product";

export async function POST(request) {
    dbConnect()
    let data = await request.json()
    // console.log(data)
    if (data) {
        let newproduct = await product.create(data)
        // console.log(newproduct)
    }

    return NextResponse.json("Done")
}
export async function GET(request) {
    dbConnect()
    let data = await request
    // console.log(data)

    let getproduct = await product.find()
    // console.log(getproduct)

    return NextResponse.json({products:getproduct})
}