   // Define a function to set the user data in local storage
 type User = {
    name: string,
    _id: string,
    email: string,
 }  
export const  userLocalStorage = {

    setUserToLocalStorage :(userData:User | null) => {
        localStorage.setItem('userData', JSON.stringify(userData))
    },
    getUserFromLocalStorage : async () => {
        const userData =  await localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }
}
