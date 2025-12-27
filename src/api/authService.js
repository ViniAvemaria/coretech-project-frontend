import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const register = (data) => {
    return axios.post(`${API_URL}/register`, data);
};

export const login = (data) => {
    return axios.post(`${API_URL}/login`, data);
};

export const refreshToken = (token) => {
    return axios.post(`${API_URL}/refresh-token`, { refreshToken: token });
};

export const logout = () => {
    return axios.post(`${API_URL}/logout`);
};
