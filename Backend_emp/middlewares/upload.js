import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "employee_profiles", 
        allowedFormats: ["jpg", "png", "jpeg"], 
        transformation: [{ width: 500, height: 500, crop: "limit" }] 
    }
});

const upload = multer({ storage });

export default upload;