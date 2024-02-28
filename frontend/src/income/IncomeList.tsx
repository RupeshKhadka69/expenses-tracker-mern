
import { useQueryClient } from "react-query";
import { FaMoneyCheck } from "react-icons/fa";
import { IncomeService } from "../services/IncomeService";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";

import { FaRegEdit } from "react-icons/fa";

const IncomeList: React.FC<incomeType> = ({ _id, title, description, amount, date, category }) => {
  
    const queryClient = useQueryClient();
    console.log(_id);

    const deleteIncome = async (id: string | undefined) => {
        try {
            await IncomeService.deleteIncome(id);
            queryClient.invalidateQueries('allIncome');
            console.log("Income deleted successfully!");
            console.log("uddd", id);
        } catch (error) {
            console.log("uddd", id);

            console.error("Error deleting income:", error);
        }

    }


    return (
        <div>

        <div className="flex items-center justify-between bg-gray-400 m-[20px] p-[20px] rounded-md">
            <div className="flex gap-[20px] items-start">
                <div className="icon text-3xl"><FaMoneyCheck /></div>

                <div className="details ">
                    <div className="flex items-center gap-3">
                        <p className="text-2xl capitalize">{title}</p>
                        <p className="flex items-center" ><FaDollarSign className="text-xl" /> <span className="text-xl">{amount}</span> </p>
                    </div>
                    <div>
                        <div className="flex gap-[10px]">
                            <p>Date: {date}</p>

                        </div>
                        <div>
                            <p>Detail:{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button ><FaRegEdit className="text-3xl " /></button>
                <button onClick={() => deleteIncome(_id)}><MdOutlineDeleteOutline className="text-3xl " /></button>

            </div>
        </div>
        </div>
    )
}

export default IncomeList