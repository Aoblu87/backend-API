import express from "express";
import { Author } from "../models/authors.js";
import { BlogPost } from "../models/blogPosts.js";
import bcrypt from "bcrypt";
const authorsRouter = express.Router();

// TEST
authorsRouter.get("/test", async (req, res) => {
  res.json({ message: "Users router working!" });
});
//   Ritorna tutti gli autori
authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await Author.find({});
    if (!authors) {
      return res.status(404).send();
    }

    res.json(authors);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Ritorna un autore specifico
authorsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const authors = await Author.findById(id);
    if (!authors) {
      return res.status(404).send();
    }

    res.json(authors);
  } catch (error) {
    console.log(error);
    res.status(505).send(error);
  }
});

//Ritorna i post di un autore specifico
authorsRouter.get("/:id/blogPosts", async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ messaggio: "Autore non trovato" });
    }
    const blogPosts = await BlogPost.find({ "author._id": id });
    res.json(blogPosts);
  } catch (error) {
    console.log(error);
    res.status(505).send(error);
  }
});

//Aggiungi un autore
authorsRouter
  .post("/", async (req, res) => {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const newAuthor = await Author.create({ ...req.body, password });
      await newAuthor.save();
      res.status(201).send(newAuthor);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
  // CONTROLLARE PASSWORD PER LOGIN
  .post("/session", async (req, res) => {
    const { email, password } = req.body;
    const user = await Author.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Logged in" });
  });

//Modifica un autore specifico
authorsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateAuthors = await Author.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateAuthors) {
      return res.status(404).send();
    } else {
      res.json(updateAuthors);
    }
  } catch (error) {
    console.log(error);
    req.status(400).send(error);
  }
});
//Elimina un autore specifico
authorsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAuthors = await Author.findByIdAndDelete(id);
    if (!deleteAuthors) {
      return res.status(404).send();
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//AGGIUNGI AVATAR
// .patch(
//   "/:authorId/avatar",
//   uploadFile.single("avatar"),
//   async (req, res, next) => {
//     try {
//       if (!req.file) {
//         return res
//           .status(400)
//           .json({ error: "Nessun file avatar caricato." });
//       }

//       const addAvatar = await Author.findByIdAndUpdate(
//         req.params.authorId,
//         { avatar: req.file.path },
//         { new: true }
//       );

//       if (!addAvatar) {
//         return res.status(404).json({ error: "Autore non trovato." });
//       } else {
//         res.json(addAvatar);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default authorsRouter;
