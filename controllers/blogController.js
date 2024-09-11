const Blog = require("../models/Blog");

// Add Blog Post
const addBlog = async (req, res) => {
  const { title, author, date, comments, details } = req.body;
  const imagePath = req.file ? `/blogsImage/${req.file.filename}` : "";

  const newBlog = new Blog({
    image: imagePath,
    title,
    author,
    date,
    comments,
    details,
  });

  try {
    const savedBlog = await newBlog.save();
    res.json({
      message: "Blog post added successfully!",
      blog: savedBlog,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add blog post" });
  }
};

// Get All Blog Posts
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch blogs" });
  }
};

// Get Blog Post by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog details" });
  }
};

// Edit Blog Post
const editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, author, date, comments, details, existingImage } = req.body;
  let imagePath = existingImage;

  if (req.file) {
    imagePath = `/blogsImage/${req.file.filename}`;
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { image: imagePath, title, author, date, comments, details },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ message: "Blog post updated successfully!", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

// Delete Blog Post
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ message: "Blog post deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};

module.exports = { addBlog, getBlogs, getBlogById, editBlog, deleteBlog };
