// import { useQuery } from "react-query";
// import { ExpenseService } from "../services/ExpenseService";
import ExpenseList from "./ExpenseList";
// import { UserDataComponent } from "../components/UserData";
import { Spinner } from "@chakra-ui/react";
import { useState } from 'react'
import GetAllExpense from "../services/GetExpense";
import AddExpense from "./AddExpense";
const PersonExpense = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const { data, isLoading, isError } = GetAllExpense();




  
  if (isLoading) return <div className="flex h-screen justify-center items-center"><Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  /></div>
  if (isError) return <div>Error fetching data</div>;

  if (!data || !data.data || data.data.length === 0) {
    return <div>No income data available</div>;
  }
  const totalExpenseAmount = data.data.reduce((total: number, expenseItem: incomeType) => total + expenseItem.amount, 0);

  return (
    <div className="w-full">
      <div className="text-right container mx-auto ">
         <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4 mr-[20px]" onClick={openModal}>Add Expense</button></div>
      <AddExpense isOpen={isModalOpen} onClose={closeModal} />
      <h1 className="text-center text-xl py-8">Total Income <span className="text-2xl text-lime-500">{totalExpenseAmount}</span></h1>
      <div className="flex flex-col  ">
        <div className=" overflow-x-auto ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-stone-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Description
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.data.map((expenseItem: incomeType) => {
                    const { _id, title, amount, description, date, category } = expenseItem;
                    return <ExpenseList category={category} key={_id} _id={_id} title={title} amount={amount} description={description} date={date} />

                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
    // </div>
  );
};

export default PersonExpense;
