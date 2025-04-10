import axios from "axios";

const API_URL = "http://localhost:5000/movies";

export const getMovies = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addMovie = async (movieData) => {
    const response = await axios.post(API_URL, movieData);
    return response.data;
};

export const updateMovie = async (id, movieData) => {
    const response = await axios.put(`${API_URL}/${id}`, movieData);
    return response.data;
};  

export const deleteMovie = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
