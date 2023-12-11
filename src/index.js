import express from "express"
import mongoose from "mongoose"
import { genericError } from "./middlewares/genericError.js"
import apiRouter from "./routers/apiRouter.js"

const server = express()

const port = 3030

server.use("/api", apiRouter)
//MIDDLEWARES
server.use(genericError)

// server.use(notFound);

// server.use(cors())
// server.options('*', cors());
// server.get('/cors', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.send({ "msg": "This has CORS enabled 🎈" })
//   })

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(port, () => {
            console.log("Server listening to port: " + port)
        })
    })
    .catch(() => {
        console.log("Errore nella connessione al DB")
    })
