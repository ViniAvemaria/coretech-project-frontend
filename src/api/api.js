import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const authPaths = ["/auth/login", "/auth/register", "/auth/refresh-token", "/auth/logout"];

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config;

        if (
            err.response?.status === 401 &&
            !original._retry &&
            !authPaths.some((path) => original.url?.includes(path))
        ) {
            original._retry = true;
            await api.post("/auth/refresh-token");
            return api(original);
        }

        return Promise.reject(err);
    },
);

export default api;
