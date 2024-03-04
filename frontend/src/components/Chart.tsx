import { useState, useEffect } from 'react';
import GetAllIncome from '../services/GetIncome';
import GetAllExpense from '../services/GetExpense';
import { dateFormat } from '../utils/Date';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
const Chart = () => {
    const { data:Allincome, isLoading, isError } = GetAllIncome();
    const {data:AllExpense}  = GetAllExpense();
    const [income, setIncome] = useState([]);
    const [expense,setExpense] = useState([]);
    useEffect(()=> {
        if(AllExpense && AllExpense.data){
            setExpense(AllExpense.data);
        }
    },[AllExpense])

    useEffect(() => {
        if (Allincome && Allincome.data) {
            setIncome(Allincome.data);
        }
    }, [Allincome]);

    console.log("incomes", income);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    if (!income || income.length === 0) {
        return <div>No expense data available</div>;
    }
    ChartJs.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
    )
    const chartdata = {
        labels: income.map((inc) => {
            const { date } = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...income.map((income) => {
                        const { amount } = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expense.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }



    return (
        <div className="bg-rose-100 border-2 border-white shadow-md p-2  md:p-4 rounded-2xl h-full  w-full" >
            <Line data={chartdata} />
        </div>
    )

};

export default Chart;
