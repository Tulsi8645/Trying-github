const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true, // Make this field required
  },
  to: {
    type: String,
    required: true, // Make this field required
  },
  departDate: {
    type: String,
    required: true, // Make this field required
  },
  duration: {
    type: String,
    // Duration is not required, so no required field here
  },
  adults: {
    type: Number,
    required: true, // Make this field required
    min: [0, "Adults must be a positive number"], // Optional validation for positive numbers
  },
  children: {
    type: Number,
    // Children is not required, so no required field here
  },
  contact: {
    type: Number,
    required: true, // Make this field required
    min: [0, "Contact number must be a positive number"], // Optional validation for positive numbers
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
