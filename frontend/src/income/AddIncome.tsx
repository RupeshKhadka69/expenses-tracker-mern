import  {  useState } from 'react';
import { useMutation,useQuery ,useQueryClient} from 'react-query';
import { userLocalStorage } from '../utils/UserLocalStorage';
import { toast, ToastContainer } from 'react-toastify';
import { IncomeService } from '../services/IncomeService';
const AddIncome = () => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const {  data } = useQuery('userLogin', userLocalStorage.getUserFromLocalStorage)as { data: IUser };
    const mutation = useMutation(IncomeService.addIncome,{
        onSuccess: () => {
                    toast.success('income added successfully');
                    queryClient.invalidateQueries('allIncome')
        }
    })
  
 

 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const Adddata = await mutation.mutateAsync({userId: data._id, incomedata:{title,amount,description,date,category}})
       console.log(Adddata);
       
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <h2 className='text-xl'>Add Income</h2>
            <form onSubmit={handleSubmit} className='w-[400px]'>
               
                <div className='m-2 grid'>
                    <label className='text-sm'>Title</label>
                    <input className='px-4 py-1 border-black border-2' value={title} onChange={(e) => setTitle(e.target.value)} type="name" placeholder='email..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>Amount</label>
                    <input className='px-4 py-1 border-black border-2' value={amount.toString()} onChange={(e) => setAmount(parseFloat(e.target.value))} type="number" placeholder='email..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>description</label>
                    <input className='px-4 py-1 border-black border-2' value={description} onChange={(e) => setDescription(e.target.value)} type="name" placeholder='desc..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>date</label>
                    <input className='px-4 py-1 border-black border-2' value={date} onChange={(e) => setDate(e.target.value)} type="name" placeholder='date..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>category</label>
                    <input className='px-4 py-1 border-black border-2' value={category} onChange={(e) => setCategory(e.target.value)} type="name" placeholder='category..' />
                </div>
                <button type='submit' className='btn border-2 border-black py-0.5'>signup</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddIncome;
