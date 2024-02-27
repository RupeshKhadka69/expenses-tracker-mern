// import React from 'react'
import { useQueryClient } from "react-query";
import { FaMoneyCheck } from "react-icons/fa";
import { IncomeService } from "../services/IncomeService";
const IncomeList: React.FC<incomeType> = ({ _id,title, description, amount, date, category }) => {
//    const {data} = UserDataComponent()
const queryClient = useQueryClient();
console.log(_id);

   const deleteIncome = async(id: string |undefined) => {
    try {
        await IncomeService.deleteIncome(id);
        queryClient.invalidateQueries('allIncome');
        console.log("Income deleted successfully!");
        console.log("uddd",id);
      } catch (error) {
        console.log("uddd",id);
        
        console.error("Error deleting income:", error);
      }
         
   }


    return (
        <div className="flex items-center justify-between bg-slate-500 m-[20px] p-[20px] rounded-md">
            <div className="flex gap-[20px] items-start">
            <div className="icon text-3xl"><FaMoneyCheck /></div>

                <div className="details">
                    <div className="text-2xl" >{title}</div>
                    <div>
                        <div className="flex gap-[10px]">
                            <p className="text-md">${amount}</p>
                            <p>Date: {date}</p>

                        </div>
                        <div>
                            <p>Detail:{description}</p>
                            <p>category: {category}</p>
                        </div>
                    </div>
                </div>
            </div>

            <button className="delete" onClick={()=> deleteIncome(_id)}>delete</button>
        </div>
    )
}

export default IncomeList