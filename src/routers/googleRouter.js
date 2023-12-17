import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

const googleRouter = express.Router()
googleRouter
    .get(
        "/",
        passport.authenticate("google", {
            scope: ["profile", "email"], // ovvero i dati che vogliamo ricevere da Google
            prompt: "select_account", // questo per richiede all'utente di scegliere il proprio account,,
            // altrimenti Google sceglie l'ultimo automaticamente,
            // il che non sempre è desiderabile, ad esempio volendosi autenticare con un account diverso,
            // volendo creare un nuovo account, o volendo sloggarsi
        })
    )

    // la seconda:
    .get(
        "/callback",
        passport.authenticate("google", {
            failureRedirect: "/",
            session: false,
        }),
        async (req, res) => {
            const payload = { id: req.user._id }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            })

            // 4 - Dopo aver autenticato l'utente con Google, lo reindirizziamo
            // al frontend che deve gestire i dati nell'URL oltreché nel localStorage
            res.redirect(
                `https://candid-beignet-ebe06f.netlify.app?token=${token}&userId=${req.user._id}`
            )
        }
    )
export default googleRouter
