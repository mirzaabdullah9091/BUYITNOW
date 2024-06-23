import dbConnect from "@/Backend/Config/dbConnet";
import { authorizeRoles2, isAuthenticatedUser2 } from "@/Backend/middlewares/auth2";
import { createEdgeRouter } from "next-connect";
import { Orders } from "@/Backend/controllers/addressController";
import error from "@/Backend/middlewares/errors"


const router = createEdgeRouter()

router.use(isAuthenticatedUser2,authorizeRoles2("admin"))
router.get(Orders)
router.use(error)

dbConnect()
export async function GET(req, ctx) {
    return router.run(req, ctx)
}
