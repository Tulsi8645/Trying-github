const Booking = require("../models/bookingModel");

// Save a new booking
const saveBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking saved successfully!" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the booking." });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings." });
  }
};

// Update a booking by ID
const updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    res
      .status(200)
      .json({
        message: "Booking updated successfully!",
        booking: updatedBooking,
      });
  } catch (error) {
    console.error("Error updating booking:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the booking." });
  }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the booking." });
  }
};

module.exports = { saveBooking, getBookings, updateBooking, deleteBooking };
