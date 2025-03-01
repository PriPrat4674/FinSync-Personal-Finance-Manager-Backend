const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); //loading environment variables

connectDB(); //Establishing connection to database

const app = express();
app.use(express.json()); //allows express to read JSON
app.use(express.urlencoded({ extended: true })); //allows form data parsing

//Restricting access to frontend only
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

//Routes
app.use("/api/auth", require("./routes/authRoutes"));

//Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the FinSync - Your Personal Finance Manager API.");
});

//Setting up Server
const PORT = process.env.PORT || 3000;
app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error in starting server");
  });
