import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import { authorizeRoles, isAuthenticatedUser } from "@/Backend/middlewares/auth";
import user from "@/Backend/models/user";

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
        dbConnect();
        const query = await req.nextUrl.searchParams;
        let skip = query.get("page") || 1;
       
        let userCount = await user.countDocuments();
        let resPerPage = 5;
        let skipped = resPerPage * (skip - 1)
        let users = await user.find().limit(resPerPage).skip(skipped);
        // console.log(users)
        if (!users) {
            return NextResponse.json({ msg: "No order found against this ID ", success: false }, { status: 404 })
        }
        return NextResponse.json({ resPerPage, users, userCount })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: error.message, success: false }, { status: error.statusCode })
    }


}