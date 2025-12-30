import axios from "axios";
import { refreshToken } from "./refreshApi";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

const publicPaths = ["/auth/login", "/auth/register", "/auth/refresh-token", "/auth/logout"];

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken");
    const isPublic = publicPaths.some((path) => config.url?.includes(path));

    if (token && !isPublic) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
            original._retry = true;
            const newToken = await refreshToken();
            sessionStorage.setItem("accessToken", newToken);
            original.headers.Authorization = `Bearer ${newToken}`;
            return api(original);
        }
        return Promise.reject(err);
    }
);

export default api;
