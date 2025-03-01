const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  date: { type: Date, default: new Date() },
  frequency: {
    type: String,
    enum: [
      "daily",
      "weekly",
      "bi_weekly",
      "monthly",
      "quarterly",
      "annually",
      "one_time",
    ],
    required: true,
  },
  reference: { type: String, required: true },
  remarks: { type: String, required: true },
});

module.exports = mongoose.model("Income", incomeSchema); //
