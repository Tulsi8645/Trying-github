// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const token = req.cookies.token; // Retrieve token from cookies

  if (!token) {
    return res.redirect("/login"); // Redirect if no token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.redirect("/login"); // Redirect if token is invalid
    }
    req.user = decoded; // Attach user data to request
    next();
  });
}

module.exports = isAuthenticated;
