import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import address from "@/Backend/models/address";
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";


export async function GET(req) {
    try {
       
        dbConnect()
        let query = await req.nextUrl.searchParams;
        let id = query?.get("id")
        console.log(id)
        // console.log(req.user)
        let Address = await address.findByIdAndDelete(id)
        // console.log(Address)

        if (!Address)
            throw new Error("There is no address")
        return NextResponse.json({ success: true, msg: "Done"})
    } catch (error) {
        console.error("Error during address deletion:", error);
        return NextResponse.json({ success: false, msg: error.message }, { status: 500 });
    }
}