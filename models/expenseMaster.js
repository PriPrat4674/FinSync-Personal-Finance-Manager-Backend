const mongoose = require("mongoose");

const expenseMasterSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Expense Name is required"],
    },
    category: {
      type: String,
      required: [true, "Expense Category is required"],
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      enum: [
        "daily",
        "weekly",
        "bi_weekly",
        "monthly",
        "quarterly",
        "annually",
        "one_time",
      ],
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpenseMaster", expenseMasterSchema);
