import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import product from "@/Backend/models/product";
import { authorizeRoles, isAuthenticatedUser } from "@/Backend/middlewares/auth";
import { destorys, uploads } from "@/Backend/utils/cloudinary";


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


export async function POST(request) {
    try {
        await runMiddleware(request, res, isAuthenticatedUser)
        await runMiddleware(request, res, authorizeRoles("admin"))
        dbConnect()
        let data = await request?.formData();
        if(!data){
            return NextResponse.json({success:false, msg:"Bad request"},{status:400})
        }
        let id = request.url.split("/")

        let images = data.getAll('image'); // Adjust according to how images are received
        const uploadedImages = await Promise.all(images.map((img) => uploads(img, "buyitnow/products")));
        if (!uploadedImages) {
            throw new Error("Error in storing in images!", { status: 400 })
        }

        const image_uploads = await product.findByIdAndUpdate(id[id.length - 1], { images: uploadedImages })
        if (!image_uploads) {
            throw new Error("Failed to update product images", { status: 500 })
        }

        return NextResponse.json({
            success: true,
            msg: "Successfully Updated!",
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
    }

}


export async function GET(request){
  try {

    dbConnect()
    const id = request.url.split("/");
    // console.log(id)
    const productFound = await product.findById(id[id.length - 1])
    if(!productFound){
        return NextResponse.json({
            success: false,
            msg: "Product not found!",
        },{status:404});
    }
    return NextResponse.json(productFound);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
  }
}

export async function PUT(request){
  try {
    await runMiddleware(request, res, isAuthenticatedUser)
    await runMiddleware(request, res, authorizeRoles("admin"))
    dbConnect();
    const id = request.url.split("/");
    const ProductUpdate = await request.json()
    // console.log(ProductUpdate)
    // console.log(id)
    const productFound = await product.findById(id[id.length - 1])
    if(!productFound){
        return NextResponse.json({
            success: false,
            msg: "Product not found!",
        },{status:404});
    }
    const updatedProduct = await product.findByIdAndUpdate(id[id.length - 1], ProductUpdate)
    if(!updatedProduct){
        throw new Error("Failed to update product!")
    }
    return NextResponse.json({
        success:true,
        msg:"Successfully updated"
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
  }
}


export async function DELETE(request){
    try {
    await runMiddleware(request, res, isAuthenticatedUser)
    await runMiddleware(request, res, authorizeRoles("admin"))
    dbConnect();
    const id = request.url.split("/");
    const productFound = await product.findById(id[id.length - 1])
    if(!productFound){
        return NextResponse.json({
            success: false,
            msg: "Product not found!",
        },{status:404});
    }
    // console.log(productFound.images)


    if(productFound.images.length >= 1){
        for(let i = 0; i < productFound.images.length; i++)
            var public_id = productFound.images[i].public_id
            // console.log(public_id)
         var res =  await destorys(public_id)
        if(res.result !== "ok"){
            throw new Error("Error in deleting images")
        }
    }
    let deletedProduct  = await product.findByIdAndDelete(id[id.length - 1])
    if(!deletedProduct){
        throw new Error("Error in deleting product. Please try agauin later")
    }

    return NextResponse.json({
        success:true,
        msg:"Successfully updated"
    });
    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
    }
}
