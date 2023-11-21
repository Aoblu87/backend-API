import express from "express";
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";
import cors from "cors";

const server = express();

const port = 3001;

server.use("/api", apiRouter);
server.use(cors())
server.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })


mongoose
  .connect(
    // "mongodb+srv://stefaniastruzzi:32K2xdD9cLofhbjV@cluster0.yftyrlv.mongodb.net/epicode"
    process.env.MONGO_URL

  )
  .then(() => {
    server.listen(port, () => {
      console.log("Server listening to port: " + port);
    });
  })
  .catch(() => {
    console.log("Errore nella connessione al DB");
  });