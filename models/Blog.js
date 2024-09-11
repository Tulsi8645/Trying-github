const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  image: String,
  title: String,
  author: String,
  date: String,
  comments: Number,
  details: String,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
