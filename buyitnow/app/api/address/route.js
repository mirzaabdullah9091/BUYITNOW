import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import address from "@/Backend/models/address";
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";



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

export async function POST(req) {
    
    try {
        await runMiddleware(req, res, isAuthenticatedUser);
        console.log(req.user)
        dbConnect();
        let data = await req.json()
        if (!data) {
            throw new Error("Please enter information");
        }
        if(!data.user){
            throw new Error("Please login first to access this form!")    
        }
        let storedAddress = await address.create(data)

        if (!storedAddress) {
            throw new Error("Error in storing data. Please try again later!")
        }
        return NextResponse.json({ success: true, msg: "done" })
    } catch (error) {
        if (error.errors) {
            const errorMessages = [];
            for (let key in error.errors) {
                errorMessages.push(error.errors[key].message)
            }
            return NextResponse.json({
                success: false,
                msg: errorMessages
            }, { status: 400 });
        } else {
            return NextResponse.json({
                success: false,
                msg: error.message
            }, { status: error.statusCode });
        }
    }

}


export async function GET(req) {
    // console.log(req.headers)
    try {
        await runMiddleware(req, res, isAuthenticatedUser);
        dbConnect()
        let user = req?.user._id;
        // console.log(req.user)
        let Addresses = await address.find({user})
        // console.log(Addresses)
      
        if (!Addresses)
            throw new Error("There is no address")
        return NextResponse.json({ success: true, msg: "Done", Addresses: Addresses })
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode })
    }
}
