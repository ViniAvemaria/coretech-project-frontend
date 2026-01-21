import api from "./api";

const API_URL = "/auth";

export const register = (data) => api.post(`${API_URL}/register`, data);

export const login = (data) => api.post(`${API_URL}/login`, data);

export const refresh = () => api.post(`${API_URL}/refresh-token`);

export const logout = () => api.post(`${API_URL}/logout`);

export const recoverPassword = (data) => api.post(`${API_URL}/recover-password`, data);

export const resetPassword = (token, id, password) =>
    api.post(`${API_URL}/reset-password?token=${token}&id=${id}`, { password });

export const requestEmailChange = () => api.get(`${API_URL}/change-email`);

export const requestPasswordChange = () => api.get(`${API_URL}/change-password`);

export const validateEmailChange = (data) => api.post(`${API_URL}/validate-email-change`, data);

export const validatePasswordChange = (data) => api.post(`${API_URL}/validate-password-change`, data);
