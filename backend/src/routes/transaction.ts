import express from 'express'
import shield from '../middleware/authCheck';
import { addIncome,getAllIncomes ,deleteIncomeById} from "../controller/income";
const router = express.Router();
router.post("/add-income",shield,addIncome)
router.get("/income/all",shield,getAllIncomes);
router.delete("/income/delete/:id",shield,deleteIncomeById);


export default router;