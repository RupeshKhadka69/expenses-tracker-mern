import { useState, createContext, ReactNode } from "react";
  type incomeType = {
       name: string, 
      description: string,
      category: string,
      type: string,
      date: string
      _id: string,
      title: string,
    }

interface TransactionContextType {
    income: incomeType[];
    getAllIncome: (userIncome: incomeType[]) => void;
}
export const TransactionContext = createContext<TransactionContextType>({
    income: [],
    getAllIncome: () => {}, // Placeholder function
});

export const TransactionProvider = async ({ children }: { children: ReactNode }) => {
    const [income, setIncome] = useState<incomeType[]>([]); // Adjust the type according to your data structure
    const getAllIncome = async (userIncome: incomeType[]) => {
        setIncome(userIncome)
    }

    return (
        <TransactionContext.Provider
            value={{ income, getAllIncome }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

