import {useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
const {user,setUser}= useContext(AuthContext);
 const logout = ()=> {
     setUser(null);
 }
 const getFirstName = (name:string) =>  name.split(' ')[0] 
  return (
    <div>
      <div className='flex items-center justify-between px-8 bg-slate-500'>
        <div className="logo">Rupesh</div>
          {!user ?(
            <ul className='flex items-center gap-4'>
            <li><Link to={"/login"}>login</Link></li>
            <li><Link to={"/register"}>register</Link></li>
        </ul>

          ): (
            <ul className='flex items-center gap-4'>
              <li>`{getFirstName(user.name)}`</li>
              <li onClick={logout} > logout</li>

            </ul>
          )

          }
      </div>
    </div>
  )
}

export default Navbar