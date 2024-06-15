import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import user from "@/Backend/models/user";
import { destorys, uploads } from "@/Backend/utils/cloudinary";
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";


export const config = {
    api: {
        bodyParser: false,
    },
};

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

export async function PUT(request) {

    try {
        await runMiddleware(request, res, isAuthenticatedUser);
        dbConnect();

        const data = await request.formData();
        const name = data.get("name")
        const email = data.get("email")
        const imagefile = data.get("image")
        const userData = { name, email };
        // console.log(imagefile)
        if (request.user) {
            userData.id = request.user._id;
        }
        if (imagefile) {
            var avatarResponse = await uploads(imagefile, "buyitnow/avatars")
            if (!avatarResponse) {
                return NextResponse.json("Error in storing image", { status: 400 })
            }
       
        }

        let updatedUser = await user.findByIdAndUpdate(userData.id, userData)

        if (updatedUser.avatar.public_id && avatarResponse ) {  //If avatar exist then this code delete the previous avatar form Cloudinary 
            let public_id = updatedUser.avatar.public_id;
            // console.log("public_id")
            let deleteAvatar = await destorys(public_id)
            if (!deleteAvatar) {
                return NextResponse.json("Error in updating avatar. Please try again later!", { status: 400 })
            }
        }
        
            updatedUser.avatar = avatarResponse
            updatedUser = await updatedUser.save()
            // console.log(updatedUser)
            if (!updatedUser) {
                throw new Error("Error in updating user or network error")
            }
            
        return NextResponse.json({ success: true, msg: "Updated Successfully", user:updatedUser})
    } catch (error) {
            return NextResponse.json({ success: false, msg: error.message},{status:error.statusCode})
    }
}
