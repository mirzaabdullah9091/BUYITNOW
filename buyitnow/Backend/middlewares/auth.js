
import { getServerSession } from "next-auth"
import ErrorHandler from "../utils/errorHandler"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"



const isAuthenticatedUser = async(req,res,next) => {

    const session = await getServerSession(authOptions)
    

    if(!session)
        return next(new ErrorHandler("Login first to access this route", 401))

    req.user = session.user

    next();
}

export { isAuthenticatedUser }