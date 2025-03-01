const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (req, res, next) => {
  let token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied! No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //Attaching user info to request
    next();
  } catch (error) {
    console.log("Facing error here at authMiddleWare.js", error);
    res.status(401).json({ message: "Invalid Token!" });
  }
};

module.exports = protect;
