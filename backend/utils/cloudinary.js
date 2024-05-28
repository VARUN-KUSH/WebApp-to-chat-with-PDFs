import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: 'du1i2vxym', 
  api_key: '349794644752574', 
  api_secret: 'ENN35bKRWYZKpoW5jlmTCgCBx-4'
});

//console.log(cloudinary.config)

const uploadOnCloudinary = async (localFilePath) => {
    try {
        
        if (!localFilePath) return console.error("unable to get file path")
            //upload on cloudinary similar to s3
            const file_upload = await cloudinary.uploader.upload(localFilePath, {
                resource_type:'auto'
            })
            //file uploaded successfully
            console.log("file uploaded on cloudinary", response.url);
            return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove locally saved file if upload operation failed
        console.error("error while uploading")
        return null
    }
}

export {uploadOnCloudinary}
