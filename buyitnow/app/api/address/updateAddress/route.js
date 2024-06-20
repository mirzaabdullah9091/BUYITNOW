import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import address from "@/Backend/models/address";
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";




const runMiddleware = (req, res, fn) => {

    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}
const res = {
    status: (statusCode) => ({
        json: (data) => ({ statusCode, ...data })
    }),
    end: () => { }

};


export async function POST(req) {
    try {
        await runMiddleware(req, res, isAuthenticatedUser)
        dbConnect();
        let query = await req.nextUrl.searchParams;
        let id = query?.get("id")
        let data = await req.json()
        // console.log(data)
        if (!data) {
            throw new Error("Address not found");
        }
        data.user = req.user
        if(!data.user){
            throw new Error("Please login first to access this form!")    
        }
        let updatedAddress = await address.findByIdAndUpdate(id, data)
        // console.log(updatedAddress)
        if (!updatedAddress) {
            throw new Error("Error in storing data. Please try again later!")
        }
        return NextResponse.json({ success: true, msg: "done" })
    } catch (error) {
        return NextResponse.json({
            success: false,
            msg: error.message
        }, { status: error.statusCode });

    }

}

export async function GET(req) {
    try {
        await runMiddleware(req, res, isAuthenticatedUser)
        dbConnect()
        let query = await req.nextUrl.searchParams;
        let id = query?.get("id")
        // console.log(req.user)
        let Address = await address.findById(id)
        // console.log(Address)

        if (!Address)
            throw new Error("There is no address")
        return NextResponse.json({ success: true, msg: "Done", Address: Address })
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode })
    }

}

export async function DELETE(req) {
    try {
        const res = new NextResponse();
        await runMiddleware(req, res, isAuthenticatedUser);
        dbConnect()
        let query = await req.nextUrl.searchParams;
        let id = query?.get("id")
        console.log(" Delete Adreess")
        let deletedAddress = await address.findByIdAndDelete(id)
        if (!deletedAddress) {
            throw new Error("There is no address to delete")
        }
        
        return NextResponse.json({ success: true, msg: "Address deleted successfully" })
       } catch (error) {
        console.error("Error during address deletion:", error.message);
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode });
    }
}