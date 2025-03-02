const mongoose = require("mongoose");

const incomeMasterSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Income Source Name is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
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
      required: [true, "Source Amount is required."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("IncomeMaster", incomeMasterSchema);
