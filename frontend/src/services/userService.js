import axios from "axios";

const API_URL = "http://localhost:5000/users";

// Đăng ký
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// Đăng nhập
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

// Lấy danh sách tất cả user (admin)
export const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Lấy thông tin 1 user theo ID
export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Thêm mới user (nếu cần tạo từ admin)
export const addUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// Cập nhật user theo ID
export const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
};

// Xóa user theo ID
export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
