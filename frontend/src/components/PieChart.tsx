import React, { useState, useEffect } from 'react';
import GetAllIncome from '../services/GetIncome';
import GetAllExpense from '../services/GetExpense';
import { Pie } from 'react-chartjs-2';

interface Income {
    date: string;
    amount: number;
}

interface Expense {
    amount: number;
}

const PieChart: React.FC = () => {
    const { data: AllIncome, isLoading, isError } = GetAllIncome();
    const { data: AllExpense } = GetAllExpense();
    const [income, setIncome] = useState<Income[]>([]);
    const [expense, setExpense] = useState<Expense[]>([]);

    useEffect(() => {
        if (AllExpense && AllExpense.data) {
            setExpense(AllExpense.data);
        }
    }, [AllExpense]);

    useEffect(() => {
        if (AllIncome && AllIncome.data) {
            setIncome(AllIncome.data);
        }
    }, [AllIncome]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    if (!income || income.length === 0) {
        return <div>No expense data available</div>;
    }

    const chartData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                data: [
                    income.reduce((acc, curr) => acc + curr.amount, 0),
                    expense.reduce((acc, curr) => acc + curr.amount, 0),
                ],
                backgroundColor: ['green', 'red'],
            },
        ],
    };

    return (
        <div className="bg-rose-100 border-2 border-white shadow-md p-2 md:p-4 rounded-2xl h-full w-full">
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
