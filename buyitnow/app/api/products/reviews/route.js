import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import { isAuthenticatedUser } from "@/Backend/middlewares/auth";
import product from "@/Backend/models/product";




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

export async function PUT(req) {
    
    try {
        // await runMiddleware(req, res, isAuthenticatedUser);
        dbConnect();
        let data = await req.json()
        if(!data){
            throw new Error("Nothing found in comment")
        }
        const review = {
            user : data?.productId,
            rating : Number(data?.rating),
            comment: data?.comment

        }
        const productFound  = await product.findById(data?.productId)
        if(!productFound){
            return NextResponse.json({
                success: false,
                msg: "Product not found!",
            },{status:404});
        }

        const isReviewed = productFound?.reviews?.find(
            (r)=> r.user === req.user._id
        )
        // console.log(isReviewed)
        if(isReviewed){
            productFound.reviews.forEach((review)=> {
                if (review.user === req.user._id) {
                  review.comment = data.comment;
                  review.rating = data.rating;
                }
              })
        }else{
            productFound?.reviews.push(review)
        }
        productFound.rating =
        productFound?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
        productFound.reviews.length;
        // console.log(productFound)
        await productFound?.save()
        // console.log(productFound)
        return NextResponse.json({
            success:true,
            msg:"Successfully updated"
        }); 

    }
    catch(error){
        console.error("Error:", error);
        return NextResponse.json({ success: false, msg: error.message }, { status: error.statusCode || 500 });
    }
}