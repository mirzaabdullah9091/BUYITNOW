
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"


const isAuthenticatedUser2 = async (req, next) => {

    const session = await getServerSession(authOptions)

    if (!session || session === null){
        return NextResponse.json({msg:"Unauthorized", success:false },{status:401})
        }
        
    req.user = session?.user;
    return next()

}

const authorizeRoles2 = (...roles) => {
    return (req, res, next) => {
        // console.log(roles)
        if (!roles.includes(req?.user?.role)) {
            return NextResponse.json({msg:`Role (${req?.user?.role}) is not allowed to access this route.`, success:false },{status:401})
        }
        return next()
    }
}

export { isAuthenticatedUser2, authorizeRoles2 }