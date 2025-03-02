const express = require("express");
const router = express.Router();
const {
  addExpenseSource,
  updateExpenseSource,
  deleteExpenseSource,
  getExpenseSource,
} = require("../controllers/expenseController");
const { protect, blacklistedTokens } = require("../middleware/authMiddleWare");

router.post("/", protect, addExpenseSource);

router.get("/", protect, getExpenseSource);

router.put("/:id", protect, updateExpenseSource);

router.delete("/:id", protect, deleteExpenseSource);

module.exports = router;
