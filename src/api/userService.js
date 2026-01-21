import api from "./api";

const API_URL = "/users";

export const userInfo = () => api.get(`${API_URL}/me`);

export const updateEmail = (data) => api.patch(`${API_URL}/update-email`, data);

export const upadtePassword = (data) => api.patch(`${API_URL}/update-password`, data);
