const express = require("express");
const {
  saveBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/submit-booking", saveBooking);
router.get("/get-bookings", getBookings);
router.put("/edit-bookings/:id", updateBooking);
router.delete("/delete-bookings/:id", deleteBooking);

module.exports = router;
