const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = function (email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: [validateEmail, "Please enter a valid email address."],
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//comparing password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
