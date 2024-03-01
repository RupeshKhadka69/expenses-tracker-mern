import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { userLocalStorage } from '../utils/UserLocalStorage';
import { toast, ToastContainer } from 'react-toastify';
import { IncomeService } from '../services/IncomeService';
type props = {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const AddIncome = ({ isOpen, onClose }: props) => {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const { data } = useQuery('userLogin', userLocalStorage.getUserFromLocalStorage) as { data: IUser };
    const mutation = useMutation(IncomeService.addIncome, {
        onSuccess: () => {
            toast.success('income added successfully');
            queryClient.invalidateQueries('allIncome')
        }
    })





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const Adddata = await mutation.mutateAsync({ userId: data._id, incomedata: { title, amount, description, date, category } })
        console.log(Adddata);

    };

    return (
            <div className={`fixed inset-0 z-50 overflow-auto ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex items-center justify-center min-h-screen ">
                    <div className="modal-overlay absolute w-full h-full  bg-gray-900 opacity-50 z-40"></div>
                    <div className="modal-container bg-white w-[400px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Add Income</p>
                                <button className="modal-close text-2xl font-bold" onClick={onClose}>&times;</button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='m-2 grid'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Title</label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title..' />
                                </div>
                        <div className='m-2 grid'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Amount</label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={amount.toString()} onChange={(e) => setAmount(parseFloat(e.target.value))} type="number" placeholder='email..' />
                        </div>
                        <div className='m-2 grid'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>description</label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={description} onChange={(e) => setDescription(e.target.value)} type="name" placeholder='desc..' />
                        </div>
                        <div className='m-2 grid'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>date</label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={date} onChange={(e) => setDate(e.target.value)} type="name" placeholder='date..' />
                        </div>
                        <div className='m-2 grid'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>category</label>
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={category} onChange={(e) => setCategory(e.target.value)} type="name" placeholder='category..' />
                        </div>
                        <button type='submit' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 w-full rounded-full'>signup</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        
    );
};

export default AddIncome;
