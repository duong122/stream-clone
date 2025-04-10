import axios from "axios";

const API_URL = "http://localhost:5000/studios";

export const getStudios = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addStudio = async (studioData) => {
    const response = await axios.post(API_URL, studioData);
    return response.data;
};

export const updateStudio = async (id, studioData) => {
    const response = await axios.put(`${API_URL}/${id}`, studioData);
    return response.data;
};

export const deleteStudio = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
