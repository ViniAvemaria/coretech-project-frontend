import api from "./api";

const API_URL = "/cart";

export const getCart = () => api.get(`${API_URL}`);

export const addItem = (data) => api.post(`${API_URL}`, data);

export const incrementItem = (id) => api.post(`${API_URL}/increment/${id}`);

export const decrementItem = (id) => api.post(`${API_URL}/decrement/${id}`);

export const deleteFromCart = (id) => api.delete(`${API_URL}/${id}`);
