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
        dbConnect()
        let id = req.url.split("/")
       
        const users = await user.findById(id[id.length-1])
// console.log(orders)
        if(!users)
            return  NextResponse.json({msg:"No user found against this ID ", success:false},{status:404})
            
        return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({msg:error.message, success:false},{status:error.statusCode})
    }
}

export async function PUT(req){
    try {
        await runMiddleware(req, res, isAuthenticatedUser);
        await runMiddleware(req, res, authorizeRoles("admin"));
        dbConnect()
        let id = req.url.split("/")
        const userData = await req.json()
        // console.log(userData)
        const users = await user.findById(id[id.length-1])
// console.log(orders)
        if(!users)
            return  NextResponse.json({msg:"No user found against this ID ", success:false},{status:404})
        const updatedUser = await user.findByIdAndUpdate(id[id.length-1], userData )
        // console.log(updatedUser)
        if(!updatedUser)
            return  NextResponse.json({msg:"failed to update user ", success:false},{status:500})
        
        return NextResponse.json({success:true, updatedUser})
    }catch(error){
        return NextResponse.json({msg:error.message, success:false},{status:error.statusCode}) 
    }
}

export async function DELETE(request){
    try {
    await runMiddleware(request, res, isAuthenticatedUser)
    await runMiddleware(request, res, authorizeRoles("admin"))
    dbConnect();
    const id = request.url.split("/");
    const userFound = await user.findById(id[id.length - 1])
    if(!userFound){
        return NextResponse.json({
            success: false,
            msg: "User not found!",
        },{status:404});
    }
  
    let deletedUser  = await user.findByIdAndDelete(id[id.length - 1])
    if(!deletedUser){
        throw new Error("Error in deleting user. Please try agauin later")
    }

    return NextResponse.json({
        success:true,
        msg:"Successfully deleted"
    });
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
    }
}
