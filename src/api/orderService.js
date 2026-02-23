import api from "./api";

const API_URL = "/orders";

export const getById = (id) => api.get(`${API_URL}/${id}`);

export const getAll = () => api.get(API_URL);

export const getAllAdmin = () => api.get(`${API_URL}/admin`);

export const create = (data) => api.post(API_URL, data);

export const cancel = (id) => api.post(`${API_URL}/${id}/cancel`);

export const updateStatus = (id, status) =>
    api.put(`${API_URL}/${id}/status`, null, {
        params: { status },
    });
