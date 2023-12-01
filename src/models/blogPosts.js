import mongoose, { Schema } from "mongoose";

const BlogPostsSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  readTime: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: "minute",
    },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "authors",
  },

  content: {
    type: String,
    required: true,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "comments",
    author: {
      type: Schema.Types.ObjectId,
      ref: "authors",
    },
  },
});

export const BlogPost = mongoose.model("blogPosts", BlogPostsSchema);
