import { NextResponse } from "next/server";


export default (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    let error = {...err}
    error.message = err.message || "Internal Server Error"

    res.status(error.statusCode).json({
        success: false,
        error,
        message:error.message,
        stack: error.stack
    })
    return NextResponse.json({
        success: false,
        error,
        message:error.message,
        stack: error.stack
    },{status:error.statusCode})
}