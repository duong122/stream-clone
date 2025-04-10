import axios from "axios";

const API_URL = "http://localhost:5000/categories";

export const getCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addCategory = async (categoryData) => {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
};

export const updateCategory = async (id, categoryData) => {
    const response = await axios.put(`${API_URL}/${id}`, categoryData);
    return response.data;
};

export const deleteCategory = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
