import { useQuery } from 'react-query';
import { userLocalStorage } from '../utils/UserLocalStorage';

export const UserDataComponent = () =>  useQuery({queryKey:["user"], queryFn: userLocalStorage.getUserFromLocalStorage}) as { data: IUser };

