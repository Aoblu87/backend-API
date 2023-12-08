import jwt from "jsonwebtoken"
import { Author } from "../models/authors.js"

// Encoded !== encrypted
// Un pezzo del nostro JWT token è CODIFICATO in base64
// ma non è criptato, quindi è leggibile da chiunque
//Andiamo a prendere dal token
const checkJwt = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] // Prendo il token dagli HEADERS: Authorization sotto forma di  "Bearer <token>", lo divido in due array usando lo spazio come separatore(split) e accedo all'array di indice [1]() questo per eliminare Bearer dall'analisi
        const payload = jwt.verify(token, process.env.JWT_SECRET) // verifico nel TOKEN che la SIGNATURE corrisponda alla nostra JWT_SECRET

        req.author = await Author.findById(payload.id).select("-password") //Cerco l'autore con attraverso l'id preso nel payload e restituisco in "req.author" tutti i dati del modello Author tranne la password

        if (!req.author) {
            return res.status(404).json({ message: "User not found" })
        }

        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

export default checkJwt
