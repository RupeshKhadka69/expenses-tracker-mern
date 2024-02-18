import { useState } from "react"

import { handleQuery } from "../utils/useGetFetchQuery"
import { Navigate, Outlet } from "react-router-dom"
type data = {
    name: string,
    email: string,
    _id: string
}
const PrivateRoute = () => {
    const data = handleQuery.useGetFetchQuery('userLogin') as data
    useState(()=> {
     handleQuery.InvalidataFetchQuery('userLogin');
    },)

    return data ? <Outlet /> : <Navigate to={"/"} />

}

export default PrivateRoute