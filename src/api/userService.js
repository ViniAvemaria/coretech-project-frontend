import api from "./api";

const API_URL = "/users";

export const userInfo = () => api.get(`${API_URL}/me`);

export const updateEmail = (data) => api.patch(`${API_URL}/update-email`, data);

export const updatePassword = (data) => api.patch(`${API_URL}/update-password`, data);

export const updateName = (data) => api.patch(`${API_URL}/update-name`, data);

export const deleteUser = (data) => api.delete(API_URL, { data });

export const getAddresses = () => api.get(`${API_URL}/addresses`);

export const createAddress = (data) => api.post(`${API_URL}/addresses`, data);

export const updateAddress = (id, data) => api.put(`${API_URL}/addresses/${id}`, data);

export const deleteAddress = (id) => api.delete(`${API_URL}/addresses/${id}`);
