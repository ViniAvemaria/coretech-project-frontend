import api from "./api";

const API_URL = "/categories";

export const getAll = () => api.get(`${API_URL}`);
