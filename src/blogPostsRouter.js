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
  const blogPost = await BlogPost.findById(id);
  if (!blogPost) {
    return res.status(404).send();
  }

  res.json(blogPost);
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
export default blogPostsRouter;
