import express from "express"
import googleRouter from "./googleRouter.js"

const authRouter = express.Router()

//Autenticazione google
authRouter.use("/google", googleRouter)
export default authRouter
