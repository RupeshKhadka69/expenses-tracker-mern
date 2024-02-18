// import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { userLocalStorage } from '../utils/UserLocalStorage';
import { useQuery ,useQueryClient} from 'react-query';

type UserData = {
  name: string;
  email: string;
  _id: string;
};
const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Update user state when user data changes in local storage
  

  // const getFirstName = (name:string) => name.split(' ')[0];

  const logout = () => {
    userLocalStorage.setUserToLocalStorage(null); // Clear user data from local storage
    queryClient.invalidateQueries('userLogin');
    navigate("/")
   // Invalidate the 'userLogin' query to trigger a refetch
  };
  const {  data } = useQuery('userLogin', userLocalStorage.getUserFromLocalStorage)as { data: UserData };
console.log(data);

  return (
    <div>
      <div className='flex items-center justify-between px-8 bg-slate-500'>
        <div className="logo">Rupesh</div>
        {!data ? (
          <ul className='flex items-center gap-4'>
            <li><Link to={"/login"}>login</Link></li>
            <li><Link to={"/register"}>register</Link></li>
          </ul>
        ) : (
          <ul className='flex items-center gap-4'>
            <li>{data.name}</li>
            <li onClick={logout}>logout</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
