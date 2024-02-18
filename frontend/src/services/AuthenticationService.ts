import { httpClient } from "../config/HtttpConfig"

export const AuthenticationService = {
    login(loginData: unknown) {
        return httpClient.post("/api/auth/login", loginData);
    },
    register(registerData: unknown) {
        return httpClient.post("/api/auth/register", registerData);
    }
}