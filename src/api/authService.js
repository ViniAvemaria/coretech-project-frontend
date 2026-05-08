import api from "./api";

const API_URL = import.meta.env.VITE_API_URL;
const PATH = "/auth";

export const register = (data) => api.post(`${PATH}/register`, data);

export const login = (data) => api.post(`${PATH}/login`, data);

export const googleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
};

export const refresh = () => api.post(`${PATH}/refresh-token`);

export const logout = () => api.post(`${PATH}/logout`);

export const recoverPassword = (data) => api.post(`${PATH}/recover-password`, data);

export const resetPassword = (token, id, password) =>
    api.post(`${PATH}/reset-password?token=${token}&id=${id}`, { password });

export const requestEmailChange = () => api.get(`${PATH}/change-email`);

export const requestPasswordChange = () => api.get(`${PATH}/change-password`);

export const validateEmailChange = (data) => api.post(`${PATH}/validate-email-change`, data);

export const validatePasswordChange = (data) => api.post(`${PATH}/validate-password-change`, data);

export const deleteAccount = () => api.get(`${PATH}/delete-account`);
