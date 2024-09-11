require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const bookingRoutes = require("./routes/bookingRoutes");
const tourRoutes = require("./routes/tourRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const isAuthenticated = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serves static files from 'public'

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

// Routes
app.use("/api", bookingRoutes);
app.use("/api", tourRoutes);
app.use("/api", blogRoutes);
app.use("/api", contactRoutes);
app.use("/api", authRoutes);

// Route Mapping
const routeMapping = {
  "/": "index.html",
  "/signup": "signup.html",
  "/login": "login.html",
  "/userbookings": "userbookings.html",
  "/contacts": "contacts.html",
  "/tours": "tours.html",
  "/blogs": "blogs.html"
  

};

Object.keys(routeMapping).forEach((route) => {
  if (
    route === "/userbookings" ||
    route === "/contacts" ||
    route === "/tours" ||
    // route === "/signup" ||
    route === "/blogs"
    
    
  ) {
    app.get(route, isAuthenticated, (req, res) => {
      res.sendFile(path.join(__dirname, "public", routeMapping[route]));
    });
  } else {
    app.get(route, (req, res) => {
      res.sendFile(path.join(__dirname, "public", routeMapping[route]));
    });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
