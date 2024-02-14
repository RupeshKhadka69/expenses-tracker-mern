import expensesSchema from "../model/expensesSchema";
import { Request, Response } from "express";
const addExpense = async (req: Request, res: Response) => {
  const { title, category, date, amount, description } = req.body;
  const userId = req.user._id;
  if (!title || !category || !date || !amount || !description) {
    return res.status(401).json({ message: "all fields are necessary" });
  }
  if (!amount || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  try {
    const newExpense = new expensesSchema({
      title,
      user: userId,
      amount,
      description,
      category,
      date,
    });

    await newExpense.save();

    return res.status(200).json({ message: "expense added successfully" });
  } catch (err) {
    console.error("Error adding income:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const specificUserIncome = await expensesSchema.find({ user: userId });

    return res.status(200).json({
      success: true,
      message: "expense data retrieved successfully",
      data: specificUserIncome,
    });
  } catch (err) {
    console.error("Error retrieving expense data:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: 'ID not provided' });
    }

    const deletedExpense = await expensesSchema.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Income entry not found' });
    }

    return res.status(200).json({ message: 'expense entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense entry:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { addExpense, getAllExpenses,deleteExpenseById };
