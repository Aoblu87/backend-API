import mongoose, { Schema } from "mongoose";


const AuthorSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  cognome: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  dataNascita: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
});

export const Author = mongoose.model("authors", AuthorSchema);