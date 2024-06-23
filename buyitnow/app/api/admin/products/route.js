import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import product from "@/Backend/models/product";
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
export async function POST(request) {
    try {
        await dbConnect();

        await runMiddleware(request, res, isAuthenticatedUser);
        await runMiddleware(request, res, authorizeRoles('admin'));

        let data = await request.json()
        data.user = request?.user._id;
        // console.log(data)
        if (!data) {
            throw new Error("Please provide valid information")

        }
        let newproduct = await product.create(data)
        // console.log(newproduct)
        if(!newproduct){
            throw new Error("Error in storing product",{status:400})
        }
        return NextResponse.json({
            success: true,
            msg: "Successfully Created!",
        },{status:201})
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode })
    }
}


