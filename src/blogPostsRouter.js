import express from "express";
import { BlogPost } from "./models/blogPosts.js";

const blogPostsRouter = express.Router();

// TEST
blogPostsRouter.get("/test", async (req, res) => {
  res.json({ message: "Users router working!" });
});
//   Ritorna tutti i blogPosts
blogPostsRouter.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find({});
  if (!blogPosts) {
    return res.status(404).send();
  }

  res.json(blogPosts);
});

//Ritorna specifico blogPosts
blogPostsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blogPosts = await BlogPost.findById(id);
  if (!blogPosts) {
    return res.status(404).send();
  }

  res.json(blogPosts);
});

//Aggiungi un blogPost
blogPostsRouter.post("/", async (req, res) => {
  try {
    const newBlogPost = new BlogPost(req.body);
    await newBlogPost.save();
    res.status(201).send(newBlogPost);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//Modifica blogPost specifico
blogPostsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogPosts = await BlogPost.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!blogPosts) {
      return res.status(404).send();
    }
    res.json(blogPosts);
  } catch (error) {
    console.log(error);
    req.status(400).send(error);
  }
});
//Elimina blogPost specifico
blogPostsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogPosts = await BlogPost.findByIdAndDelete(id);
    if (!blogPosts) {
      return res.status(404).send();
    }
    res.json(blogPosts);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
export default blogPostsRouter;
