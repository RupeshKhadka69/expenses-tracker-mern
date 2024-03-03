import { httpClient } from "../config/HtttpConfig";
interface addIncome {
    userId: string | undefined;
    incomedata: incomeType;
}

export const IncomeService = {
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

    async addExpense({ userId, incomedata }: addIncome) {
        try {
            const response = await httpClient.post(`/api/user/add-expense/${userId}`, incomedata);
            return response.data;
        } catch (error) {
            console.error("Error adding income:", error);
            throw error;
        }
    }
};
