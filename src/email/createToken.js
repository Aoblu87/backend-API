import jwt from "jsonwebtoken"

const createToken = async (id, next) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })
        return token
    } catch (error) {
        next(error)
    }
}

export default createToken
