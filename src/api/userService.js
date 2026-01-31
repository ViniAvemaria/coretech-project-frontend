import api from "./api";

const API_URL = "/users";

export const userInfo = () => api.get(`${API_URL}/me`);

export const updateEmail = (data) => api.patch(`${API_URL}/update-email`, data);

export const upadtePassword = (data) => api.patch(`${API_URL}/update-password`, data);

export const updateName = (data) => api.patch(`${API_URL}/update-name`, data);

export const deleteUser = (data) => api.delete(API_URL, { data });
