import axios from "axios";

const API_URL = process.env.API_URL +"/auth"; 

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const getAllUsers = async (token: string) => {
  const response = await axios.get(`${API_URL}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
