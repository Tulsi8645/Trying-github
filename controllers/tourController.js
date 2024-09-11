const Tour = require("../models/Tour");

const addTour = async (req, res) => {
  const { name, price,duration, details } = req.body; // Include details
  const imagePath = req.file ? `/toursImage/${req.file.filename}` : ""; // Updated path

  const newTour = new Tour({
    image: imagePath,
    name,
    price,
    duration,
    details, // Include details
  });

  try {
    const savedTour = await newTour.save();
    res.json({
      message: "Tour added successfully!",
      tour: savedTour,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add tour" });
  }
};

// Get Tours
const getTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json({ success: true, tours });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch tours" });
  }
};

// Get Tour by ID
const getTourById = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json({ success: true, tour });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tour details" });
  }
};

// Edit Tour
const editTour = async (req, res) => {
  const { id } = req.params;
  const { name, price,duration, details, existingImage } = req.body;
  let imagePath = existingImage;

  console.log("Incoming file:", req.file); // Log file details
  console.log("Body:", req.body);

  if (req.file) {
    imagePath = `/toursImage/${req.file.filename}`;
  }

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { image: imagePath, name, price,duration, details },
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json({ message: "Tour updated successfully!", tour: updatedTour });
  } catch (error) {
    console.error("Error updating tour:", error); // Log error details
    res.status(500).json({ error: "Failed to update tour" });
  }
};




// Delete Tour
const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json({ message: "Tour deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tour" });
  }
};

module.exports = { addTour, getTours, getTourById, editTour, deleteTour };
