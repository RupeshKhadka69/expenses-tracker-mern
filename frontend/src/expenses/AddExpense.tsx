// import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { userLocalStorage } from '../utils/UserLocalStorage';
import { toast, ToastContainer } from 'react-toastify';
import { ExpenseService } from '../services/ExpenseService';
import { useForm } from 'react-hook-form';
import { FormData, UserSchema } from '../form/types';
import FormField from '../form/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectForm from '../form/Select';
type props = {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const AddExpense = ({ isOpen, onClose }: props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },

    } = useForm<FormData>({ resolver: zodResolver(UserSchema), });
    const queryClient = useQueryClient();

    const { data } = useQuery('userLogin', userLocalStorage.getUserFromLocalStorage) as { data: IUser };
    const mutation = useMutation(ExpenseService.addExpense, {
        onSuccess: () => {
            toast.success('expense added successfully');
            queryClient.invalidateQueries('allExpense')
        }
    })





    const onSubmit = async (formdata: FormData) => {
        const Adddata = await mutation.mutateAsync({ userId: data._id, expensedata: formdata })
        reset();
        console.log(Adddata);

    };

    return (
        <div className={`fixed inset-0 z-50 overflow-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="modal-overlay absolute w-full h-full  bg-gray-900 opacity-50 z-40"></div>
                <div className="modal-container bg-white w-[400px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">Add expense</p>
                            <button className="modal-close text-2xl font-bold" onClick={onClose}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='m-2 grid'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Title</label>
                                <FormField
                                    type="name"
                                    placeholder="Title"
                                    name="title"
                                    register={register}
                                    error={errors.title}
                                />
                            </div>
                            <div className='m-2 grid'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Amount</label>
                                <FormField
                                    type="number"
                                    placeholder="Amount"
                                    name="amount"
                                    register={register}
                                    error={errors.amount}
                                    valueAsNumber
                                />
                            </div>
                            <div className='m-2 grid'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>description</label>
                                <FormField
                                    type="name"
                                    placeholder="description"
                                    name="description"
                                    register={register}
                                    error={errors.description}
                                />
                            </div>
                            <div className='m-2 grid'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>date</label>
                                <FormField
                                    type="date"
                                    placeholder='data'
                                    name="date"
                                    register={register}
                                    error={errors.date}
                                />
                            </div>
                            <div className='m-2 grid'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>category</label>
                              <SelectForm name='category' register={register} error={errors.category}/>
                            </div>
                            <button type='submit' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-4 w-full rounded-full'>Add Expense</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default AddExpense;
