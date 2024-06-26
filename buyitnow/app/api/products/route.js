import { NextResponse } from "next/server";
import dbConnect from "@/Backend/Config/dbConnet";
import product from "@/Backend/models/product";


export async function GET(request) {
    dbConnect()
    let data = await request.nextUrl.searchParams
    let filters = data.get("filters");
    let limit = data.get("limit") || 2;
    let skip = data.get("page") || 1;
    let skipped = limit * (skip - 1)
    var FilterApply  = {};
    // console.log(skipped)
//    let keyword = filters.split('=')[1]
        if(filters){
         FilterApply = JSON.parse(filters)
         if(FilterApply.price){                 // Price filteration
            const{min,max} = FilterApply.price
            if(min !=="" , max!== ""){
                FilterApply.price = {};
                if (min !== "") {
                    FilterApply.price.$gte = parseFloat(min);
                }
                if (max !== "") {
                    FilterApply.price.$lte = parseFloat(max);
                }
            } 
           else{
            delete FilterApply.price    //Delete price if it is empty
           }
         }

         if(FilterApply.keyword){        
            const keyword = FilterApply.keyword ? 
               {$regex:FilterApply.keyword, $options:"i"}   
            :{};
            FilterApply.name = keyword
            delete FilterApply.keyword;
            // console.log(keyword)
         }else{
            delete FilterApply.keyword;
         }  
    }
    // console.log(FilterApply)
    try {
        let getproduct = await product.find(FilterApply).limit(limit).skip(skipped)
        // console.log(getproduct)
        if(getproduct.length < 1)
            return NextResponse.json({success:false})
        let documents = await product.countDocuments(FilterApply)
        // console.log(documents)
       
        return NextResponse.json({success:true, products:getproduct, CountedProducts:documents, resPerPage: limit})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error:error.message},{status:error.statusCode || 500})
    }
    
    

    
}