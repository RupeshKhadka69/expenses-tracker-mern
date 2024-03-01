
import { useQueryClient } from "react-query";
import { FaMoneyCheck } from "react-icons/fa";
import { IncomeService } from "../services/IncomeService";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";

import { FaRegEdit } from "react-icons/fa";

const IncomeList: React.FC<incomeType> = ({ _id, title, description, amount, date }) => {
  
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
        <tr  className="bg-blue-200 even:bg-stone-100 odd:bg-stone-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <FaMoneyCheck className="w-10 h-10 "/>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{title}</div>
                          <div className="text-sm text-gray-500">{date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center"><FaDollarSign/> {amount}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button  className="text-indigo-600  hover:text-indigo-900">
                        <FaRegEdit className="text-lg"/>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button onClick={()=> deleteIncome(_id)} className="text-indigo-600 hover:text-indigo-900">
                        <MdOutlineDeleteOutline className="text-lg"/>
                      </button>
                    </td>
                  </tr>
    )
}

export default IncomeList