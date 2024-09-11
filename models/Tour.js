const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  duration: String,
  details: String
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
