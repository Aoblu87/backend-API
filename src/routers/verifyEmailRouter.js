import express from "express"
import brevo from "@getbrevo/brevo"
import HTMLVerifyEmail from "../email/index.js"
import createToken from "../email/createToken.js"
import { Author } from "../models/authors.js"

const verifyEmailRouter = express.Router()

let apiInstance = new brevo.TransactionalEmailsApi()

let apiKey = apiInstance.authentications["apiKey"]
apiKey.apiKey = process.env.BREVO_API_KEY

verifyEmailRouter.post("/", async (req, res) => {
    let sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = "Verify Your Email{{params.subject}}"
    //Creo token da inviare nell'emai

    const { _id } = req.body
    // const user = await Author.findById({ _id })

    const token = createToken(_id)
    sendSmtpEmail.htmlContent = HTMLVerifyEmail(token, _id)
    sendSmtpEmail.sender = {
        name: process.env.BRAND_NAME,
        email: process.env.MY_EMAIL,
    }
    sendSmtpEmail.to = [{ email: process.env.SENDER_TO, name: "Stefania" }]
    sendSmtpEmail.replyTo = {
        name: process.env.MY_NAME,
        email: process.env.MY_EMAIL,
    }

    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" }

    sendSmtpEmail.params = {
        parameter: "macarena",
        subject: "Email di test EPICODE x Brevo",
    }

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail)

    console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
    )

    res.send(data)
})
export default verifyEmailRouter
