import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh-token")
        ) {
            originalRequest._retry = true;
            try {
                const refreshRes = await api.post("/auth/refresh-token");
                sessionStorage.setItem("accessToken", refreshRes.data.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${refreshRes.data.data.accessToken}`;
                return api(originalRequest);
            } catch {
                sessionStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
