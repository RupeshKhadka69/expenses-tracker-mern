import React, { useState } from 'react';
import { useMutation } from 'react-query'; // Import UseMutationOptions
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationService } from '../services/AuthenticationService';
import { toast, ToastContainer } from 'react-toastify';

// Define IUser interface if not already defined


const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // If you plan to use navigate, uncomment this line

    // Adjust the UseMutationOptions type to match your needs
    const { mutate, isLoading } = useMutation(AuthenticationService.register, {
        onSuccess: (data) => {
            toast.success('Registration successful');
            setName('');
            setEmail('');
            setPassword('');
            navigate("/login");
            console.log(data);

        },
        onError: () => {
            toast.error('Registration failed');
        }
    }); // Specify the generic types

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // toast.success("Registration successful"); // This line seems redundant since it's already handled in the onSuccess callback
            mutate({ name, email, password }); // Pass user data directly
        } catch (error) {
            toast.error('Registration failed.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <h2 className='text-xl'>sign up</h2>
            <form onSubmit={handleSubmit} className='w-[400px]'>
                <div className='m-2 grid items-center content-center'>
                    <label className='text-sm'>Name</label>
                    <input className='px-4 py-1 border-black border-2' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>Email</label>
                    <input className='px-4 py-1 border-black border-2' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email..' />
                </div>
                <div className='m-2 grid'>
                    <label className='text-sm'>Password</label>
                    <input className='px-4 py-1 border-black border-2' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password..' />
                </div>
                <button type='submit' className='btn border-2 border-black py-0.5'>{isLoading ? 'Loading...' : 'Submit'}</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default RegisterUser;

