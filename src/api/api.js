import axios from "axios";

const api = axios.create({
    baseURL: "https://coretech-project-backend.onrender.com/api",
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
