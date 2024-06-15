import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import bcrypt from "bcrypt"
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";
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

export async function PUT(req) {
    try {
        await runMiddleware(req, res, isAuthenticatedUser)
        dbConnect()
        let Passwords = await req.json()
        // console.log(Passwords)
        let currentPassword = Passwords.currentPassword
        const userfound = await user.findById(req.user._id).select("+password")
        // console.log(userfound)
        const passwordMatch = await bcrypt.compare(currentPassword, userfound.password);
        if (!passwordMatch)
            throw new Error("Old password doesn't match");
        if (passwordMatch)
            userfound.password = Passwords.newPassword
        await userfound.save()
        return NextResponse.json({ success: true, msg: "Password successfully changed" })
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode })
    }
}
