import express from "express";
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";

const server = express();

const port = 3001;

server.use("/api", apiRouter);

mongoose
  .connect(
    "mongodb+srv://stefaniastruzzi:32K2xdD9cLofhbjV@cluster0.yftyrlv.mongodb.net/epicode"
    // process.env.NODE_ENV

  )
  .then(() => {
    server.listen(port, () => {
      console.log("🚀 Server listening to port: " + port);
    });
  })
  .catch(() => {
    console.log("Errore nella connessione al DB");
  });