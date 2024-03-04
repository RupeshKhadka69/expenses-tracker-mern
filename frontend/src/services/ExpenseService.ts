import { httpClient } from "../config/HtttpConfig";
interface addExpense {
    userId: string | undefined;
    expensedata: incomeType;
}

export const ExpenseService = {
    async getExpense(userId: string | undefined) {
        try {
            const response = await httpClient.get(`/api/user/expense/all/${userId}`);
            
            return response.data;
        } catch (error) {
            console.error("Error fetching income:", error);
            throw error;
        }
    },
    async deleteExpense(userId: string | undefined){
        try{
            const response = await httpClient.delete(`/api/user/expense/delete/${userId}`);
            return response;
        }
        catch(err){
                console.log("Error on Deleting income",err);
                throw err;
                
        }
    },

    async addExpense({ userId, expensedata }: addExpense) {
        try {
            const response = await httpClient.post(`/api/user/add-expense/${userId}`, expensedata);
            return response.data;
        } catch (error) {
            console.error("Error adding income:", error);
            throw error;
        }
    }
};
