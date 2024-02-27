import { Navigate, Outlet } from "react-router-dom"
import { Suspense } from "react";
import { useQuery } from 'react-query';
import { userLocalStorage } from '../utils/UserLocalStorage';
// import { UserDataComponent } from "./UserData";

const PrivateRoute = () => {
    const { data, isLoading } = useQuery({queryKey:["user"], queryFn: userLocalStorage.getUserFromLocalStorage}) as { data: IUser, isLoading: boolean };

    console.log("private", data);

    if (isLoading) {
        return <div>Loading...</div>; // Render a loading indicator while data is being fetched
    }

    return data ? <Outlet /> : <Navigate to={"/"} replace />;
}

const PrivateRouteWrapper = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute />
    </Suspense>
);

export default PrivateRouteWrapper;
