import { NextResponse } from "next/server";
import address from "../models/address";


export const newAddress= async(req,res)=>{
    let data = await req.json()
    try {
        if(!data){
            throw new Error("Please enter information");
        }
        let storedAddress = await address.create(data)
        // console.log(storedAddress)
        if(!storedAddress){
            throw new Error("Error in storing data. Please try again later!")
        }
        return NextResponse.json({success:true, msg:"done"})
    } catch (error) {
        if(error.errors){
            const errorMessages =[];
            for(let key in error.errors){
                errorMessages.push(error.errors[key].message)
            }
            return NextResponse.json({
                success: false,
                msg:errorMessages
              },{status:400});
        } else{
            return NextResponse.json({
                success: false,
                msg:error
              },{status:400});
        }
        }
      
}