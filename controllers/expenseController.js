const ExpenseMaster = require("../models/expenseMaster");

const addExpenseSource = async (req, res) => {
  try {
    const { name, category, frequency, amount } = req.body;

    if (!name || !category || !frequency) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExpense = await ExpenseMaster.create({
      userEmail: req.user.email,
      name,
      category,
      frequency,
      amount,
    });

    res
      .status(201)
      .json({ message: "Expense Source Added", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//getting expense sources
const getExpenseSource = async (req, res) => {
  try {
    const expenses = await ExpenseMaster.find({ userEmail: req.user.email });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//updating expense source
const updateExpenseSource = async (req, res) => {
  try {
    const { name, category, frequency, amount } = req.body;

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Expense ID" });
    }
    const expense = await ExpenseMaster.findOne({
      _id: req.params.id,
      userEmail: req.user.email,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense Source Not Found" });
    }

    expense.name = name !== undefined ? name : expense.name;
    expense.category = category !== undefined ? category : expense.category;
    expense.frequency = frequency !== undefined ? frequency : expense.frequency;
    expense.amount = amount !== undefined ? amount : expense.amount;

    await expense.save();
    res.json({ message: "Expense Source Updated", expense });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//deleting expense source
const deleteExpenseSource = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Expense ID" });
    }

    const expense = await ExpenseMaster.findOne({
      _id: req.params.id,
      userEmail: req.user.email,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense Source Not Found" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense Source Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  addExpenseSource,
  getExpenseSource,
  updateExpenseSource,
  deleteExpenseSource,
};
