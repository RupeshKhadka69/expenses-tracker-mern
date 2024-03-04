import { useQuery } from 'react-query';
import { IncomeService } from './IncomeService';
import { UserDataComponent } from '../components/UserData';

const GetAllIncome = () => {
  const { data: users } = UserDataComponent();
  const fetchExpenseData = async () => IncomeService.getIncome(users._id as string);
 return   useQuery({queryKey:["allIncome"], queryFn: fetchExpenseData});
 

}
  export default GetAllIncome