import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import { authorizeRoles2, isAuthenticatedUser2 } from "@/Backend/middlewares/auth2";

import { createEdgeRouter } from "next-connect";
import { Users } from "@/Backend/controllers/addressController";

const router = createEdgeRouter()

router.use(isAuthenticatedUser2, authorizeRoles2("admin")).get(Users)
dbConnect();
export async function GET(req, ctx) {
   return router.run(req,ctx)


}