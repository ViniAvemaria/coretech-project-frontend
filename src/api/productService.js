import api from "./api";

const API_URL = "/products";

export const getById = (id) => api.get(`${API_URL}/${id}`);

export const getAll = () => api.get(`${API_URL}`);

export const create = (token, data) =>
    api.post(`${API_URL}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const createFromImport = (token, data) =>
    api.post(`${API_URL}/import`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const update = (token, id, data) =>
    api.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deleteProduct = (token, id) =>
    api.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
