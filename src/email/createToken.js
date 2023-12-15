import jwt from "jsonwebtoken"

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
    return token
}

export default createToken
