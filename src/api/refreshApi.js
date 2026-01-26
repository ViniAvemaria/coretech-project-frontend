import axios from "axios";

const refreshApi = axios.create({
    baseURL: "https://coretech-project-backend.onrender.com/api",
    withCredentials: true,
});

export const refreshToken = async () => {
    const res = await refreshApi.post("/auth/refresh-token");
    return res.data.data.accessToken;
};
