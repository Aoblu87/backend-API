import express from "express";
import { BlogPost } from "./models/blogPosts.js";
import { genericError } from "./middlewares/genericError.js";
const searchPostRouter = express.Router();

// trova per TITOLO
searchPostRouter.get("/", async (req, res, next) => {
  try {
    const { title } = req.query;

    // Controlla se è stato fornito un parametro "title" nella query
    if (!title) {
      return res
        .status(400)
        .json({ messaggio: 'Il parametro "title" è obbligatorio' });
    }

    // Esegui la ricerca dei blog per titolo
    const titleResult = await BlogPost.find({
      title: { $regex: title, $options: "i" },
    });

    res.json(titleResult);
  } catch (errore) {
    console.error(errore);
    next(genericError);
  }
});

export default searchPostRouter;
