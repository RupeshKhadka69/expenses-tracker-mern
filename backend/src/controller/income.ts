import { Request, Response } from "express";
import IncomeSchema from "../model/IncomeSchema";
const addIncome = async (req: Request, res: Response) => {
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
    const newIncome = new IncomeSchema({
      title,
      user: userId,
      amount,
      description,
      category,
      date,
    });

    await newIncome.save();

    return res.status(200).json({ message: "Income added successfully" });
  } catch (err) {
    console.error("Error adding income:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllIncomes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const specificUserIncome = await IncomeSchema.find({ user: userId });

    return res.status(200).json({
      success: true,
      message: "Income data retrieved successfully",
      data: specificUserIncome,
    });
  } catch (err) {
    console.error("Error retrieving income data:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteIncomeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: 'ID not provided' });
    }

    const deletedIncome = await IncomeSchema.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: 'Income entry not found' });
    }

    return res.status(200).json({ message: 'Income entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting income entry:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { addIncome, getAllIncomes,deleteIncomeById };
