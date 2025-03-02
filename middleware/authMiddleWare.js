const jwt = require("jsonwebtoken");
const User = require("../models/User");

const blacklistedTokens = new Set(); //storing blacklisted tokens

const protect = async (req, res, next) => {
  try {
    console.log("Protect Middleware hit");

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (blacklistedTokens.has(token)) {
        return res.status(401).json({ message: "Token has been logged out" });
      }
      console.log("Token Received");
    }

    if (!token) {
      console.log("No token, authorization failed.");
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ email: decoded.email }).select("-password");

    if (!req.user) {
      console.log("User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    console.error("Error in protect middleware.");
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect, blacklistedTokens };
