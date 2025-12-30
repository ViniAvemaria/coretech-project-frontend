import api from "./api";

const API_URL = "/products";

export const getById = (id) => api.get(`${API_URL}/${id}`);

export const getAll = () => api.get(`${API_URL}`);

export const create = (data) => api.post(`${API_URL}`, data);

export const update = (id, data) => api.put(`${API_URL}/${id}`, data);

export const deleteProduct = (id) => api.delete(`${API_URL}/${id}`);
