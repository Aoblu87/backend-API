import express from "express"
import { Author } from "../models/authors.js"
import { BlogPost } from "../models/blogPosts.js"
import bcrypt from "bcrypt"
import checkJwt from "../middlewares/checkJwt.js"
import jwt from "jsonwebtoken"
import uploadFile from "../middlewares/uploadFile.js"

const authorsRouter = express.Router()

// AUTENTICAZIONE------------CONTROLLARE PASSWORD PER LOGIN E RESTITUIRE TOKEN
authorsRouter
    .post("/session", async (req, res) => {
        const { email, password } = req.body
        const author = await Author.findOne({ email })
        if (!author) {
            return res.status(404).send({ message: "User not found" })
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            author.password
        )
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" })
        }
        const payload = { id: author._id }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        res.status(200).json({ token, payload, message: "Logged in" })
    })

    // CREA TOKEN---------GET BY ID autore per restituirgli un token, memorizzarlo nel local storage (frontend),controllare che sia valido per effettuare richieste (frontend)
    .get("/:id", checkJwt, async (req, res) => {
        const author = await Author.findById(req.params.id)

        if (!author) {
            res.status(404).json({ message: "User not found" })
            return
        }

        // il nostro utente, dopo l'autenticazione, è disponibile dentro req.user
        // (siccome glielo abbiamo messo noi nel middleware checkJwt)

        res.status(200).json(req.author)
    })
    //   Ritorna tutti gli autori GET
    .get("/", async (req, res, next) => {
        try {
            const authors = await Author.find({}).select("-password")
            if (!authors) {
                return res.status(404).send()
            }

            res.json(authors)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    //Ritorna un autore specifico GET/:ID

    // .get("/:id", async (req, res) => {
    //     try {
    //         const { id } = req.params
    //         const authors = await Author.findById(id).select("-password")
    //         if (!authors) {
    //             return res.status(404).send()
    //         }

    //         res.json(authors)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(505).send(error)
    //     }
    // })

    //Ritorna i post di un autore specifico GET/:ID/BLOGPOSTS
    .get("/:id/blogPosts", async (req, res) => {
        try {
            const { id } = req.params
            const author = await Author.findById(id).select("-password")
            if (!author) {
                return res.status(404).json({ messaggio: "Autore non trovato" })
            }
            const blogPosts = await BlogPost.find({ "author._id": id })
            res.json(blogPosts)
        } catch (error) {
            console.log(error)
            res.status(505).send(error)
        }
    })

    //POST-----Aggiungi un autore e fai HASHING della password

    .post("/", async (req, res) => {
        try {
            const { email } = req.body
            //cercao se esiste già un utente con la stessa email
            const author = await Author.findOne({ email })
            if (author) {
                return res.status(400).send({ message: "Email already exists" })
            }
            const password = await bcrypt.hash(req.body.password, 10) // fai hashing della password inserita nella nel body della richiesta del form
            //Crea autore, sovrascrivendo il campo della password con quella criptata
            const newAuthor = await Author.create({
                ...req.body,
                password,
            })

            // Rimuov0 il campo 'password' prima di inviarlo nella risposta
            const authorWithoutPassword = {
                _id: newAuthor._id,
                firstName: newAuthor.firstName,
                lastName: newAuthor.lastName,
                email: newAuthor.email,
            }

            await newAuthor.save()
            if (newAuthor) {
                res.status(201).send(authorWithoutPassword)
            } else {
                next(error)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    //Modifica un autore specifico PUT
    .put("/:id", async (req, res) => {
        try {
            const { id } = req.params
            const updateAuthors = await Author.findByIdAndUpdate(id, req.body, {
                new: true,
            }).select("-password")

            if (!updateAuthors) {
                return res.status(404).send()
            } else {
                res.json(updateAuthors)
            }
        } catch (error) {
            console.log(error)
            req.status(400).send(error)
        }
    })
    //Elimina un autore specifico DELETE
    .delete("/:id", async (req, res) => {
        try {
            const { id } = req.params
            const deleteAuthors = await Author.findByIdAndDelete(id)
            if (!deleteAuthors) {
                return res.status(404).send()
            } else {
                res.status(204).send()
            }
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    //AGGIUNGI AVATAR
    .patch(
        "/:authorId/avatar",
        uploadFile.single("avatar"),
        async (req, res, next) => {
            try {
                if (!req.file) {
                    return res
                        .status(400)
                        .json({ error: "Nessun file avatar caricato." })
                }

                const addAvatar = await Author.findByIdAndUpdate(
                    req.params.authorId,
                    { avatar: req.file.path },
                    { new: true }
                )

                if (!addAvatar) {
                    return res
                        .status(404)
                        .json({ error: "Autore non trovato." })
                } else {
                    res.json(addAvatar)
                }
            } catch (error) {
                next(error)
            }
        }
    )

    // Rotta PATCH per aggiornare un autore esistente
    .patch("/:id/email&password", async (req, res) => {
        const { id } = req.params
        const { email, password } = req.body

        try {
            // Puoi aggiungere controlli aggiuntivi qui se necessario

            // Verifica se la password è stata fornita
            if (password) {
                // Hash della nuova password
                const hashedPassword = await bcrypt.hash(password, 10)

                // Aggiorna l'autore con la nuova password hashata
                await Author.findByIdAndUpdate(id, {
                    email,
                    password: hashedPassword,
                })
            } else {
                // Se la password non è stata fornita, aggiorna solo l'email
                await Author.findByIdAndUpdate(id, { email })
            }

            res.status(200).send({ message: "Author updated successfully" })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

export default authorsRouter
