 import { v2 as cloudinary } from "cloudinary";
 import fs from 'fs'

 cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
 });

 const uploadCloudinary = async(localFilePath) => {
    try {
        // logic here
        if(!localFilePath) return null 

        // upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath , {resource_type : 'auto'})

        // file has been uploaded successfully

        console.log(' ✅ file is uploaded on cloudinary' , response.secure_url)

        fs.unlinkSync(localFilePath)
         console.log("🗑️ Local file deleted:", localFilePath);
        return response;
  
    } catch (error) {
        console.log(' ❌ cloudinary upload error' , error.message);
        throw new Error('file upload failed');
        
    }
 }

 export default uploadCloudinary