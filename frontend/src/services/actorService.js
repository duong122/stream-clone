import axios from "axios";

const API_URL = "http://localhost:5000/actors";

export const getActors = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addActor = async (actorData) => {
    const response = await axios.post(API_URL, actorData);
    return response.data;
};

export const updateActor = async (id, actorData) => {
    const response = await axios.put(`${API_URL}/${id}`, actorData);
    return response.data;
};

export const deleteActor = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
