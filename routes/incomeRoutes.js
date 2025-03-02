const express = require("express");
const router = express.Router();
const {
  addIncomeSource,
  updateIncomeSource,
  deleteIncomeSource,
  getIncomeSource,
} = require("../controllers/incomeController");
const { protect, blacklistedTokens } = require("../middleware/authMiddleWare");

router.post("/", protect, addIncomeSource);

router.get("/", protect, getIncomeSource);

router.put("/:id", protect, updateIncomeSource);

router.delete("/:id", protect, deleteIncomeSource);

module.exports = router;
