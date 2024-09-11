const express = require("express");
const multer = require("multer");
const path = require("path");
const { addTour, getTours,getTourById, editTour, deleteTour } = require("../controllers/tourController");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/toursImage"); // Path where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

router.post("/add-tour", upload.single("image"), addTour);
router.get("/get-tours", getTours);
router.get("/get-tour/:id", getTourById);
router.put("/edit-tour/:id", upload.single("image"), editTour);  // Route for editing tours
router.delete("/delete-tour/:id", deleteTour); // Route for deleting tours

module.exports = router;
