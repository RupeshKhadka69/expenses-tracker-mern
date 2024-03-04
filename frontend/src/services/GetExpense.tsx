import { useQuery } from 'react-query';
import { ExpenseService } from './ExpenseService';
import { UserDataComponent } from '../components/UserData';

const GetAllExpense = () => {
  const { data: users } = UserDataComponent();
  const fetchExpenseData = async () => await ExpenseService.getExpense(users._id as string);
 return   useQuery({queryKey:["allExpense"], queryFn: fetchExpenseData});
 
//   const fetchExpenseData = async () => {
//     const expenses = await ExpenseService.getExpense(users._id as string);
//     return expenses;
//   };
}
  export default GetAllExpense