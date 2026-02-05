import api from "./api";

const API_URL = "/products";

export const getById = (id) => api.get(`${API_URL}/${id}`);

export const getAll = (category, search, page, size, sort) =>
    api.get(API_URL, {
        params: {
            ...(category && { category }),
            ...(search && { search }),
            ...(page !== undefined && { page }),
            ...(size && { size }),
            ...(sort && { sort }),
        },
    });

export const create = (data) => api.post(`${API_URL}`, data);

export const createFromImport = (data) => api.post(`${API_URL}/import`, data);

export const update = (id, data) => api.put(`${API_URL}/${id}`, data);

export const deleteProduct = (id) => api.delete(`${API_URL}/${id}`);
