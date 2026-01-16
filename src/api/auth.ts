import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth"; 

// Login API
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; 
};

// Register API (optional)
export const registerUser = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// Get all users (admin only)
export const getAllUsers = async (token: string) => {
  const response = await axios.get(`${API_URL}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
