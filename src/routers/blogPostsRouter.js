import express from "express";
import { BlogPost } from "../models/blogPosts.js";
import { Comment } from "../models/comments.js";

const blogPostsRouter = express.Router();

//   Ritorna tutti i blogPosts
blogPostsRouter
  .get("/", async (req, res) => {
    try {
      const { title } = req.query;
      const blogPosts = await BlogPost.find(
        title ? { title: { $regex: title, $options: "i" } } : {}
      ).populate("author", "firstName lastName avatar");
      if (!blogPosts) {
        return res.status(404).send();
      }

      res.json(blogPosts);
    } catch (error) {
      console.log(error);
      res.status(505).send(error);
    }
  })

  //Ritorna specifico blogPosts
  .get("/:id", async (req, res) => {
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
  })

  //Aggiungi un blogPost
  .post("/", async (req, res) => {
    try {
      const newBlogPost = new BlogPost(req.body);
      await newBlogPost.save();
      res.status(201).send(newBlogPost);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
  //Modifica blogPost specifico
  .put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBlogPosts = await BlogPost.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedBlogPosts) {
        return res.status(404).send();
      }
      res.json(updatedBlogPosts);
    } catch (error) {
      console.log(error);
      req.status(400).send(error);
    }
  })
  //Elimina blogPost specifico
  .delete("/:id", async (req, res) => {
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
  })

  //--------------------------- Rotte per COMMENTI------------------
  // TUTTI I COMMENTI DI UN POST
  .get("/:id/comments", async (req, res, next) => {
    try {
      const comments = await BlogPost.findById(req.params.id)
        .populate("comments author")
        .select("comments -_id");

      if (!comments) {
        return res.status(404).send();
      }

      res.json(comments);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  })
  //ESTRAPOLARE COMMENTO SPECIFICO DI UN POST
  .get("/:id/comments/:commentId", async (req, res, next) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id);
      const comment = await Comment.findById(req.params.commentId);

      if (!blogPost) {
        return res.status(404).send();
      } else if (!comment) {
        return res.status(404).send();
      }
      res.json(comment);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  })
  //AGGIUNGI COMMENTO AL POST
  .post("/:id", async (req, res, next) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id);
      if (!blogPost) {
        return res.status(404).send();
      }
      const newComment = new Comment(req.body);

      blogPost.comments.push(newComment);
      await newComment.save();
      await blogPost.save();

      res.status(201).send(newComment);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  })
  //MODIFICA COMMENTO
  .put("/:id/comments/:commentId", async (req, res, next) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id);
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { new: true }
      );

      if (!blogPost) {
        return res.status(404).send();
      } else if (!updatedComment) {
        return res.status(404).send();
      }
      res.json(updatedComment);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  })
  //CANCELLA COMMENTO
  .delete("/:id/comments/:commentId", async (req, res, next) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id);
      const deletedComment = await Comment.findByIdAndDelete(
        req.params.commentId
      );

      if (!blogPost) {
        return res.status(404).send();
      } else if (!deletedComment) {
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
