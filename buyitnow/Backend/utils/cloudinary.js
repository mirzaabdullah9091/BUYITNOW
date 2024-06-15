import cloudinary from "cloudinary"
import { Files, Rss } from "lucide-react";

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploads = async(file,  folder) =>{
    let buffer = await file.arrayBuffer();
    let bytes = Buffer.from(buffer)

    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream(
            
            (result)=>{
                // console.log(result)
                resolve({
                    public_id: result.public_id,
                        url: result.secure_url
                })
            },
            {
                resource_type:"auto",
                folder:folder,
      }
    ).end(bytes);
  })


};

const destorys = async(public_id)=>{
    return cloudinary.v2.uploader
    .destroy(public_id, {resource_type: 'image'})
    .then((res)=>{
        return res
    })
  
}


export {uploads, cloudinary, destorys}