import express from 'express'
import shield from '../middleware/authCheck';
import { addIncome,getAllIncomes ,deleteIncomeById} from "../controller/income";
import { addExpense,getAllExpenses,deleteExpenseById } from '../controller/expenses';
const router = express.Router();
// income routes

router.post("/add-income",shield,addIncome)
router.get("/income/all",shield,getAllIncomes);
router.delete("/income/delete/:id",shield,deleteIncomeById);
// expenses routes
router.post("/add-expense",shield,addExpense);
router.get("/expense/all",shield,getAllExpenses);
router.delete("/expense/delete/:id", shield,deleteExpenseById)

export default router;