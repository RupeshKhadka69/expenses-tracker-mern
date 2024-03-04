import { FiPlusCircle } from "react-icons/fi";
import { IoMdArrowDropup } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
type props = {
    totalAmount: number,
    income: number
    expense: number
  
  }
const Balance = ({totalAmount,income,expense}:props) => {
  return (
    <div className="w-[300px] p-2 ring rounded-md ring-indigo-100">
        <div className="p-4">
            <h3 className='text-md '>Your Balance</h3>
            <div className='flex items-center justify-between py-2'>
                <p className=""> $ <span className="text-xl md:text-2xl "> {totalAmount}</span></p>
                <FiPlusCircle  className='text-xl '  />
            </div>
            <div>
                <div className='flex gap-3'>
                    <p  className="flex gap-1 items-center"><IoMdArrowDropup color="green"  /> {income}</p>
                    <p className="flex gap-1 items-center"><MdOutlineArrowDropDown color="red" /> {expense}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Balance