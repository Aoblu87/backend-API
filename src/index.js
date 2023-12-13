import express from "express"
// import list from "express-list-endpoints"
import mongoose from "mongoose"
import { genericError } from "./middlewares/genericError.js"
import apiRouter from "./routers/apiRouter.js"

const server = express()

const port = 3030

server.use("/api", apiRouter)

//MIDDLEWARES
server.use(genericError)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(port, () => {
            console.log("Server listening to port: " + port)
            // console.table(list(server))
        })
    })
    .catch(() => {
        console.log("Errore nella connessione al DB")
    })
