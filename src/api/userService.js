import api from "./api";

const API_URL = "/user";

export const userInfo = (token) =>
    api.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
