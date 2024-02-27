import {useQuery } from 'react-query'
import { userLocalStorage } from '../utils/UserLocalStorage';
// import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const {  data } = useQuery('userLogin', userLocalStorage.getUserFromLocalStorage)as { data: IUser };
  

  return (
    <div className='text-2xl text-center'>{`welcome ${data?.name}`}</div>
  )
}

export default Profile