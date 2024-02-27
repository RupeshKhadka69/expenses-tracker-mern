import { useQuery } from "react-query";
import { IncomeService } from "../services/IncomeService";
import IncomeList from "./IncomeList";
import { UserDataComponent } from "../components/UserData";
const PersonIncome = () => {
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
            <h1>Total Income {totalIncomeAmount}</h1> 
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
