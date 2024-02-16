import React, { useState,useContext, useEffect } from 'react';
import { useMutation } from 'react-query'; // Import UseMutationOptions
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/api';
import { toast, ToastContainer } from 'react-toastify';

// Define IUser interface if not already defined


const Login = () => {
    const navigate = useNavigate(); // If you plan to use navigate, uncomment this line
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user,setUser} = useContext(AuthContext);
    useEffect(()=> {
        if(user){
            navigate("/");
        }

    },[user,navigate])


    // Adjust the UseMutationOptions type to match your needs
    const { mutate, isLoading } = useMutation(login, {
        onSuccess: (data) => {
            toast.success('Login successful');
            setEmail('');
            setPassword('');
            setUser(data.user);
            navigate("/")
            console.log(data);

        },
        onError: () => {
            toast.error('Login failed');
        }
    }); // Specify the generic types

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            mutate({ email, password }); // Pass user data directly
        } catch (error) {
            toast.error('Login failed.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <h2 className='text-xl'>Login In</h2>
            <form onSubmit={handleSubmit} className='w-[400px]'>
               
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

export default Login;

