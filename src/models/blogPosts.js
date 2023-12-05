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
    default: "",
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
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "comments",
    default: [],
  },
});

export const BlogPost = mongoose.model("blogPosts", BlogPostsSchema);
