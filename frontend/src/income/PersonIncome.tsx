import { useQuery } from "react-query";
import { IncomeService } from "../services/IncomeService";
import IncomeList from "./IncomeList";
import { UserDataComponent } from "../components/UserData";
import { useState } from 'react'
import AddIncome from "./AddIncome";
const PersonIncome = () => {
  //    const {data} = UserDataComponent()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { data: users } = UserDataComponent();

  console.log("use", users);

  const fetchIncomeData = async () => IncomeService.getIncome(users._id as string);
  const { data, isLoading, isError } = useQuery("allIncome", fetchIncomeData);




  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if (!data || !data.data || data.data.length === 0) {
    return <div>No income data available</div>;
  }
  const totalIncomeAmount = data.data.reduce((total: number, incomeItem: incomeType) => total + incomeItem.amount, 0);

  return (
    <div className="w-full">
      <div className="text-right container mx-auto ">
         <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4 mr-[20px]" onClick={openModal}>Add Income</button></div>
      <AddIncome isOpen={isModalOpen} onClose={closeModal} />
      <h1 className="text-center text-xl py-8">Total Income <span className="text-2xl text-lime-500">{totalIncomeAmount}</span></h1>
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
                  {data?.data.map((incomeItem: incomeType) => {
                    const { _id, title, amount, description, date, category } = incomeItem;
                    return <IncomeList category={category} key={_id} _id={_id} title={title} amount={amount} description={description} date={date} />

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

export default PersonIncome;
