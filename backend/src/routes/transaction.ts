import express from 'express'
import { addIncome,getAllIncomes ,deleteIncomeById} from "../controller/income";
import { addExpense,getAllExpenses,deleteExpenseById } from '../controller/expenses';
const router = express.Router();
// income routes

router.post("/add-income/:userid",addIncome)
router.get("/income/all/:userid",getAllIncomes);
router.delete("/income/delete/:id",deleteIncomeById);
// expenses routes
router.post("/add-expense/:userid",addExpense);
router.get("/expense/all/:userid",getAllExpenses);
router.delete("/expense/delete/:id", deleteExpenseById)

export default router;