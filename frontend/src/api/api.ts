import axios from "axios";
const baseUrl = 'http://localhost:8000/api/auth'

export const register = async (userData: IUser) => {
    return axios.post(`${baseUrl}/register`, userData).then((response)=> response.data);
  };
 
export const login = async (userData: IUser)=> {
  return axios.post(`${baseUrl}/login`, userData).then(((response) => response.data))
}