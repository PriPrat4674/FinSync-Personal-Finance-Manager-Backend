const IncomeMaster = require("../models/incomeMaster");

const addIncomeSource = async (req, res) => {
  try {
    const { name, category, frequency, amount } = req.body;

    if (!name || !category || !frequency || !amount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newIncome = await IncomeMaster.create({
      userEmail: req.user.email,
      name,
      category,
      frequency,
      amount,
    });

    res.status(201).json({ message: "Income Source Added", income: newIncome });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//getting income sources
const getIncomeSource = async (req, res) => {
  try {
    const incomes = await IncomeMaster.find({ userEmail: req.user.email });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//updating income source
const updateIncomeSource = async (req, res) => {
  try {
    const { name, category, frequency, amount } = req.body;

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Income ID" });
    }
    const income = await IncomeMaster.findOne({
      _id: req.params.id,
      userEmail: req.user.email,
    });

    if (!income) {
      return res.status(404).json({ message: "Income Source Not Found" });
    }

    income.name = name !== undefined ? name : income.name;
    income.category = category !== undefined ? category : income.category;
    income.frequency = frequency !== undefined ? frequency : income.frequency;
    income.amount = amount !== undefined ? amount : income.amount;

    await income.save();
    res.json({ message: "Income Source Updated", income });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//deleting income source
const deleteIncomeSource = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Income ID" });
    }

    const income = await IncomeMaster.findOne({
      _id: req.params.id,
      userEmail: req.user.email,
    });

    if (!income) {
      return res.status(404).json({ message: "Income Source Not Found" });
    }

    await income.deleteOne();
    res.json({ message: "Income Source Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  addIncomeSource,
  getIncomeSource,
  updateIncomeSource,
  deleteIncomeSource,
};
