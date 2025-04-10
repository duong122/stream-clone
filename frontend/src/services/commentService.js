import axios from "axios";

const API_URL = "http://localhost:5000/comments";

export const getComments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addComment = async (commentData) => {
    const response = await axios.post(API_URL, commentData);
    return response.data;
};

export const deleteComment = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
