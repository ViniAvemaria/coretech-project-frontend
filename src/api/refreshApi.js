import axios from "axios";

const refreshApi = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

export const refreshToken = async () => {
    const res = await refreshApi.post("/auth/refresh-token");
    return res.data.data.accessToken;
};
