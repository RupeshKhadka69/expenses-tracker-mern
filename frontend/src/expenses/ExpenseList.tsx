
import { useQueryClient } from "react-query";
import { ExpenseService } from "../services/ExpenseService";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import { money,stock,sales,unknown } from "../utils/Icons";
import { FaRegEdit } from "react-icons/fa";
import { dateFormat } from "../utils/Date";
const ExpenseList: React.FC<incomeType> = ({ _id, title, description,category, amount, date }) => {
  
    const queryClient = useQueryClient();
    console.log(_id);
    const expenseIcon = () => {
      switch (category) {
        case "money":
          return money;
          
        case "stock":
          return stock;
          
        case "sales":
          return sales;
          
      
        default:
          return unknown;
      }
    }

    const deleteIncome = async (id: string | undefined) => {
        try {
            await ExpenseService.deleteExpense(id);
            queryClient.invalidateQueries('allExpense');
            console.log("expense deleted successfully!");
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
                          {expenseIcon()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{title}</div>
                          <div className="text-sm text-gray-500">{dateFormat(date)}</div>
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

export default ExpenseList