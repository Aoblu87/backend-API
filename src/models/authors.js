import mongoose, { Schema } from "mongoose";


const AuthorsSchema = new Schema({
  nome: {
    type: String,
  },
  cognome: {
    type: String,
  },
  email: {
    type: String,
  },
  dataNascita: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export const Authors = mongoose.model("authors", AuthorsSchema);