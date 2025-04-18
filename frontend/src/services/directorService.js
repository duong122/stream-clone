import axios from "axios";

const API_URL = "http://localhost:5000/directors";

export const getDirectors = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addDirector = async (directorData) => {
    const response = await axios.post(API_URL, directorData);
    return response.data;
};

export const updateDirector = async (id, directorData) => {
    const response = await axios.put(`${API_URL}/${id}`, directorData);
    return response.data;
};

export const deleteDirector = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
