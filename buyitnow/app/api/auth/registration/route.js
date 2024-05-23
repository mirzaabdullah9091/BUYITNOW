import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";  
import user from "@/Backend/models/user";

export async function POST(request){
    dbConnect();
    let data  = await request.json();
    try {
        if(!data)
            throw new Error("Please enter information")
        let registerUser = await user.create(data)
        if(!registerUser)
            throw new Error("Error in storing User")
        
        return NextResponse.json({success:true, msg:"Successfully register", payload:registerUser})

    } catch (validationError) {
        if(validationError.code === 11000){
            let field = Object.keys(validationError.keyValue)[0]
            const errorMessage = `This ${field} is already registered!`
            return NextResponse.json({
                msg:errorMessage,
                success:false,
                error:validationError
            }, { status: 400 })

        }
        else if(validationError.errors ){
            const errorMessages =[];
            for(let key in validationError.errors){
                errorMessages.push(validationError.errors[key].message)
            }
            return NextResponse.json({
                success: false,
                message:errorMessages
              },{status:400});
        }
        else{
            return NextResponse.json({
                success: false,
                message:"Something went wrong!"
              },{status:400});
        }
    }

   

}