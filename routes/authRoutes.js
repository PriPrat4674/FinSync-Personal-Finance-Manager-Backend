const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

const { protect, blacklistedTokens } = require("../middleware/authMiddleWare");
const User = require("../models/User");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/logout", protect, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  blacklistedTokens.add(token);
  res.json({ message: "Logged out successfully." });
});

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
