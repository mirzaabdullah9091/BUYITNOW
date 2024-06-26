
import { getServerSession } from "next-auth"
import ErrorHandler from "../utils/errorHandler"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"



const isAuthenticatedUser = async (req,res, next) => {

    const session = await getServerSession(authOptions)

    if (!session || session === null){
        return next(new ErrorHandler("Unauthorized", 401));
        }
        
    req.user = session?.user;
    return next()

}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // console.log(roles)
        if (!roles.includes(req?.user?.role)) {
            return next(new ErrorHandler(`Role (${req?.user?.role}) is not allowed to access this route.`, 401))
        }
        return next()
    }
}

export { isAuthenticatedUser, authorizeRoles }