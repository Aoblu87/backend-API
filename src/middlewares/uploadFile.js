import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "epicode-test-backend",
  },
});
const uploadFile = multer({ storage: cloudinaryStorage });
export default uploadFile;
