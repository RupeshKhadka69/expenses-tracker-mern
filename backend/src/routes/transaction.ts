import express from 'express'
import { addIncome } from "../controller/income";
const router = express.Router();
router.post("/add-income",addIncome)


export default router;