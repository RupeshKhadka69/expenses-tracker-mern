// import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { userLocalStorage } from '../utils/UserLocalStorage';
import {  useQueryClient} from 'react-query';
import {UserDataComponent} from './UserData';
const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    userLocalStorage.setUserToLocalStorage(null); 
    queryClient.invalidateQueries('userLogin');
    navigate("/")
 
  };
  const {data} = UserDataComponent();
  console.log("navbar",data);
  
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
