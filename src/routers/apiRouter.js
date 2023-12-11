import express from "express"
import authorsRouter from "./authorsRouter.js"
import blogPostsRouter from "./blogPostsRouter.js"
import searchPostRouter from "./searchPostRouter.js"
import cors from "cors"
import commentsRouter from "./commentsRouter.js"
import verifyEmailRouter from "./verifyEmailRouter.js"
const apiRouter = express.Router()

apiRouter.use(express.json())

apiRouter.use(cors())

//Rotta per AUTORI

apiRouter.use("/authors", authorsRouter)

//Rotta per i BLOG POSTS

apiRouter.use("/blogPosts", blogPostsRouter)

//Rotte COMMENTI

apiRouter.use("/comments", commentsRouter)

//Rotta per le QUERY di ricerca
apiRouter.use("/searchPost", searchPostRouter)

//Verify Email
apiRouter.use("/verifyEmail", verifyEmailRouter)

export default apiRouter
