import express from 'express'
import shield from '../middleware/authCheck';
import { addIncome } from "../controller/income";
const router = express.Router();
router.post("/add-income",shield,addIncome)


export default router;