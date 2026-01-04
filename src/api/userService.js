import api from "./api";

const API_URL = "/user";

export const userInfo = () => api.get(`${API_URL}/me`);
