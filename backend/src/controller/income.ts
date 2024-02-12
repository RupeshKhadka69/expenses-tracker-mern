import { Request,Response } from "express";

const addIncome = async (req:Request,res:Response)=> {
  const {title,category,date,amount,description} = req.body;

  
}

export {addIncome}