// controllers/authController.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Sign up
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// Login

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Ensure JWT_SECRET is used
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }); // Set cookie
    res.redirect("/userbookings");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};


// Logout
exports.logout = (req, res) => {
  res.clearCookie("token"); // Clear the authentication cookie
  res.redirect("/login"); // Redirect to the login page
}

// Check authentication status
exports.checkAuthentication = (req, res) => {
  const token = req.cookies.token; // Retrieve token from cookies

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ isAuthenticated: false });
    }
    res.json({ isAuthenticated: true });
  });
};