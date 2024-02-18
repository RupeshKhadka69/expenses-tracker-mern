import { httpClient } from "../config/HtttpConfig"

export const IncomeService = {
    getIncome(userId: string) {
        return httpClient.get(`/income/${userId}`);
    },
}