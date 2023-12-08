import mongoose, { Schema } from "mongoose"

const AuthorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: [true, "Password required"],
        required: true,
    },
    dayOfBirth: {
        type: String,
    },
    avatar: {
        type: String,
    },
})

export const Author = mongoose.model("authors", AuthorSchema)
