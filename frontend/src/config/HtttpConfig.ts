import axios from "axios";

const baseURL = "http://localhost:8000"

export const httpClient = axios.create({
    baseURL
})