import {useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    useEffect(()=> {
        if(!user){
            navigate("/login")
        }
    },[navigate,user])


  return (
    <div className='text-2xl text-center'>{`welcome ${user?.name}`}</div>
  )
}

export default Profile