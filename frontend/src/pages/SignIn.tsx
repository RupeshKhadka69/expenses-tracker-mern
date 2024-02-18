import  {  useState } from 'react';
import { useMutation,useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../services/AuthenticationService';
import { toast, ToastContainer } from 'react-toastify';
import { userLocalStorage } from '../utils/UserLocalStorage';

const Login = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const mutation = useMutation(['loginMutation'], AuthenticationService.login, {
        onSuccess: (data) => {
            toast.success('login successful');
            setEmail('');
            setPassword('');
            navigate("/");
            userLocalStorage.setUserToLocalStorage(data.data.user)
            console.log(data);
            queryClient.invalidateQueries('userLogin')
        },
        onError: () => {
            toast.error('Registration failed');
        }
        })
    // UseQuery to check if the user is already logged in
 

 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       mutation.mutate({email,password})
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
                <button type='submit' className='btn border-2 border-black py-0.5'>signup</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
