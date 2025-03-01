const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleWare");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Route for User Registration
router.post("/newUser", registerUser);
router.post("/loginUser", loginUser);

//Protected Route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

router.get("/dashboard", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.username });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
