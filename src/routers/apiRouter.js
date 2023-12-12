import cors from "cors"
import express from "express"
import authorsRouter from "./authorsRouter.js"
import blogPostsRouter from "./blogPostsRouter.js"
import commentsRouter from "./commentsRouter.js"
import authRouter from "./authRouter.js"
import searchPostRouter from "./searchPostRouter.js"
import verifyEmailRouter from "./verifyEmailRouter.js"
import googleStrategy from "../oauth/google.js"
import passport from "passport"

const apiRouter = express.Router()

apiRouter.use(express.json())

apiRouter.use(cors())

//Autenticazione Google
passport.use(googleStrategy)

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

//OAUTH Authentication
apiRouter.use("/auth", authRouter)

export default apiRouter
