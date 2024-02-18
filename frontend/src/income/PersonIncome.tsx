
// import { useQuery } from "react-query"
// import { IncomeService } from "../services/IncomeService"
import { handleQuery } from "../utils/useGetFetchQuery"

type data = {
    name: string,
    email:string,
    _id : string
}
const PersonIncome = () => {
    const data = handleQuery.useGetFetchQuery('userLogin') as data
return (

    <h1>jenkasfka
        { data && data._id}
    </h1>
)
}

export default PersonIncome