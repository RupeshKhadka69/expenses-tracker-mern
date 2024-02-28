import { useQuery } from "react-query";
import { IncomeService } from "../services/IncomeService";
import IncomeList from "./IncomeList";
import { UserDataComponent } from "../components/UserData";
import {useState} from 'react'
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
    const {data:users} = UserDataComponent();
    
        console.log("use",users);
        
        const fetchIncomeData = async () =>  IncomeService.getIncome(users._id as string);
        const { data, isLoading, isError } = useQuery("allIncome", fetchIncomeData);

  
    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    if (!data  || !data.data || data.data.length === 0) {
        return <div>No income data available</div>;
    }
    const totalIncomeAmount = data.data.reduce((total:number, incomeItem:incomeType) => total + incomeItem.amount, 0);

    return (
        <div>
            <div className="text-right text-xl"><button onClick={openModal}>open</button></div>
            <AddIncome isOpen={isModalOpen} onClose={closeModal}/>
            <h1 className="text-center text-xl py-8">Total Income <span className="text-2xl text-lime-500">{totalIncomeAmount}</span></h1> 
            <div>
                {data?.data.map((incomeItem:incomeType) => {
                    const {_id,title,amount,description,date,category} = incomeItem;
                  return  <IncomeList category={category} key={_id} _id = {_id} title={title} amount={amount} description={description} date={date}  />
                    
})}
            </div>
        </div>
    );
};

export default PersonIncome;
