import { Request, Response } from "express";
import IncomeSchema from "../model/IncomeSchema";
const addIncome = async (req: Request, res: Response) => {
  const { title, category, date, amount, description } = req.body;
  const userId = req.user._id;
  if (!title || !category || !date || !amount || !description) {
    return res.status(401).json({ message: "all fields are necessary" });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be a positive number" });
  }

  try {
    // Create a new income instance with the provided data and user ID
    const newIncome = new IncomeSchema({
      title,
      user: userId, // Associate income with the user who earned it
      amount,
      description,
      category,
      date
    });

    // Save the income to the database
    await newIncome.save();

    // Respond with success message
    return res.status(200).json({ message: "Income added successfully" });
  } catch (err) {
    console.error("Error adding income:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addIncome };