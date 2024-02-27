import { httpClient } from "../config/HtttpConfig";
interface addIncome {
    userId: string | undefined;
    incomedata: incomeType;
}

export const IncomeService = {
    async getIncome(userId: string | undefined) {
        try {
            const response = await httpClient.get(`/api/user/income/all/${userId}`);
            
            return response.data;
        } catch (error) {
            console.error("Error fetching income:", error);
            throw error;
        }
    },
    async deleteIncome(userId: string | undefined){
        try{
            const response = await httpClient.delete(`/api/user/income/delete/${userId}`);
            return response;
        }
        catch(err){
                console.log("Error on Deleting income",err);
                throw err;
                
        }
    },

    async addIncome({ userId, incomedata }: addIncome) {
        try {
            const response = await httpClient.post(`/api/user/add-income/${userId}`, incomedata);
            return response.data;
        } catch (error) {
            console.error("Error adding income:", error);
            throw error;
        }
    }
};
