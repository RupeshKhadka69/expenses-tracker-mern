import Chart from "../components/Chart"
import { UseQueryResult } from "react-query"
import GetAllExpense from "../services/GetExpense"
import GetAllIncome from "../services/GetIncome"
import CommonCard from "./CommonCard"
import { Spinner } from "@chakra-ui/react"
import Balance from "./Balance"
import PieChart from "../components/PieChart"
const DashBoard = () => {
  const { data: Income, isLoading: loadIn, isError: incErr } = GetAllIncome();
  const { data: Expense, isLoading: loadEx, isError: expErr } = GetAllExpense();
  if (loadEx || loadIn) return <div className="flex h-screen justify-center items-center"><Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  /></div>
  if (incErr || expErr) return <div>Error fetching data</div>;

  if (!Income || Income.length === 0 || !Expense || Expense.length === 0) {
    return <div>No expense data available</div>;
  }
  function getAmount(getData: UseQueryResult<incomeType[]> | undefined): number {
    if (!getData?.data || !Array.isArray(getData.data)) {
      return 0;
    }

    return getData.data.reduce((total: number, incomeItem: incomeType) => total + incomeItem.amount, 0);
  }
  return (
    <div className="">

      <div className="container mx-auto px-4">

        <h2 className="text-3xl font-bold my-8 text-center antialiased ">DashBoard</h2>

        <div className="flex justify-between gap-4 my-8 flex-col-reverse md:flex-row">

          <div className="flex  items-center gap-4">
            <CommonCard amount={getAmount(Income)} listname="INCOME" />
            <CommonCard amount={getAmount(Expense)} listname="EXPENSE" />

          </div>
          <div className="  ">
            <Balance totalAmount={getAmount(Income) - getAmount(Expense)} income={getAmount(Income)} expense={getAmount(Expense)} />

          </div>
        </div>
        <div className="flex justify-between  flex-col md:flex-row my-8 gap-6 md:gap-4 lg:gap-8">
          <div className="grow ">
            <Chart />

          </div>
          <div className="flex-none h-[300px]">
            <PieChart />

          </div>
        </div>


      </div>
    </div>
  )
}

export default DashBoard