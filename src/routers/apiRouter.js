import express from "express";
import authorsRouter from "./authorsRouter.js";
import blogPostsRouter from "./blogPostsRouter.js";
import searchPostRouter from "./searchPostRouter.js";
import cors from "cors";
import commentsRouter from "./commentsRouter.js";
import path from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
const apiRouter = express.Router();

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "epicode-test-backend",
  },
});

const upload = multer({ storage: cloudinaryStorage });
apiRouter.patch("/multipart", upload.single("avatar"), (req, res, next) => {
  console.log(req.file.path);
  res.send({ url: req.file.path });
});

// apiRouter.use(express.json());

apiRouter.use(cors());

//Rotta per AUTORI

apiRouter.use("/authors", authorsRouter);

//Rotta per i BLOG POSTS

apiRouter.use("/blogPosts", blogPostsRouter);

//Rotte COMMENTI

apiRouter.use("/comments", commentsRouter);

//Rotta per le QUERY di ricerca
apiRouter.use("/searchPost", searchPostRouter);

export default apiRouter;
