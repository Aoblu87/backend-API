import express from "express";
import { BlogPost } from "./models/blogPosts.js";

const blogPostsRouter = express.Router();

//   Ritorna tutti i blogPosts
blogPostsRouter.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({});
    if (!blogPosts) {
      return res.status(404).send();
    }

    res.json(blogPosts);
  } catch (error) {
    console.log(error);
    res.status(505).send(error);
  }
});

//Ritorna specifico blogPosts
blogPostsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).send();
    }

    res.json(blogPost);
  } catch (error) {
    console.log(error);
    res.status(505).send(error);
  }
});

//Aggiungi un blogPost
blogPostsRouter.post("/", async (req, res) => {
  try {
    const newBlogPost = new BlogPost(req.body);
    await newBlogPost.save();
    res.status(201).send(newBlogPost);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
//Modifica blogPost specifico
blogPostsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateBlogPosts = await BlogPost.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateBlogPosts) {
      return res.status(404).send();
    }
    res.json(updateBlogPosts);
  } catch (error) {
    console.log(error);
    req.status(400).send(error);
  }
});
//Elimina blogPost specifico
blogPostsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlogPosts = await BlogPost.findByIdAndDelete(id);

    if (!deleteBlogPosts) {
      return res.status(404).send();
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

blogPostsRouter.get("/", async (req, res) => {
  try {
    const titleQuery = req.query.title;

    // Controlla se è stato fornito un parametro "title" nella query
    if (!titleQuery) {
      return res
        .status(400)
        .json({ messaggio: 'Il parametro "title" è obbligatorio' });
    }

    // Esegui la ricerca dei blog per titolo
    const blogPosts = await BlogPost.find({
      title: { $regex: titleQuery, $options: "i" },
    });

    res.json({ blogPosts });
  } catch (errore) {
    console.error(errore);
    res.status(500).json({ messaggio: "Errore del server" });
  }
});

export default blogPostsRouter;
