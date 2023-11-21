import express from 'express';
import { Authors } from './models/authors.js';

const authorsRouter= express.Router();
// TEST
authorsRouter.get("/test", async (req, res) => {
    res.json({ message: "Users router working!" });
  });
//   Ritorna tutti gli autori
  authorsRouter.get("/", async (req, res) => {
    const authors = await Authors.find({});
    if (!authors) {
        return res.status(404).send();
      }

    res.json(authors);
  });
  //Ritorna un autore specifico
  authorsRouter.get("/:id", async (req, res) => {
    const {id}= req.params;
    const authors = await Authors.findById(id);
    if (!authors) {
        return res.status(404).send();
      }

      res.json(authors);
  })
export default authorsRouter