import { NextResponse } from "next/server";
import ErrorHandler from "../utils/errorHandler";


export default function errorHandler(err,req,res,next){
    err.statusCode = err.statusCode || 500;
    let error = {...err}
    error.message = err.message || "Internal Server Error"

    return NextResponse.json({
        success: false,
        error,
        message:error.message,
        stack: error.stack
    },{status:error.statusCode})
}