const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Sign up route
router.post("/signup", authController.signup);

// Login route
router.post("/login", authController.login);

// Logout route
router.get("/logout", authController.logout);

// Authentication check route
router.get("/check-authentication", authController.checkAuthentication);

module.exports = router;
