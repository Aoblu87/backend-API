export const checkAuth = (req, res, next) => {
    if (req.headers.authorization === "password molto sicura") {
        next()
    } else {
        const error = new Error("Wrong Password")

        error.statusCode = 401
        next(error)
    }
}
