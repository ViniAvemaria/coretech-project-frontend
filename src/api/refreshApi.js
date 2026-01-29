import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const refreshApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const refreshToken = async () => {
    const res = await refreshApi.post("/auth/refresh-token");
    return res.data.data.accessToken;
};
