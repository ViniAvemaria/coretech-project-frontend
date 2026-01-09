import api from "./api";

const API_URL = "/reviews";

export const getAll = (productId) => api.get(`${API_URL}/${productId}`);

export const create = (productId, data) => api.post(`${API_URL}/${productId}`, data);

export const update = (id, data) => api.put(`${API_URL}/${id}`, data);

export const deleteReview = (id) => api.delete(`${API_URL}/${id}`);
