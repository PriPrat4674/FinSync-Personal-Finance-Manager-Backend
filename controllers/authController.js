const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body; //Debugging

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required." });
    }

    username = username.replace(/[^a-zA-Z0-9 ]/g, ""); //Removing Special Characters

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Try logging in." });
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //saving user in MongoDB
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User Created Successfully. Please log in." });
  } catch (error) {
    console.error("❌ Error in registerUser:", error.message || error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

//Login User Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    //Generating Tokens
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in Loginuser", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { registerUser, loginUser };
