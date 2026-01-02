import api from "./api";

const API_URL = "/auth";

export const register = (data) => api.post(`${API_URL}/register`, data);

export const login = (data) => api.post(`${API_URL}/login`, data);

export const refresh = () => api.post(`${API_URL}/refresh-token`);

export const logout = () => api.post(`${API_URL}/logout`);

export const handleLogout = async ({ removeUser, navigate, toast }) => {
    const response = await logout();
    removeUser();
    toast.success(response.data?.data?.message || "Sign out Successful");
    navigate("/");
};
