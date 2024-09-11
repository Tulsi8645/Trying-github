const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addBlog,
  getBlogs,
  getBlogById,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");


const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/blogsImage"); // Path where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Routes for blog management
router.post("/add-blog", upload.single("image"), addBlog);
router.get("/get-blogs", getBlogs);
router.get("/get-blog/:id", getBlogById);
router.put("/edit-blog/:id", upload.single("image"), editBlog); // Route for editing blogs
router.delete("/delete-blog/:id", deleteBlog); // Route for deleting blogs

module.exports = router;
