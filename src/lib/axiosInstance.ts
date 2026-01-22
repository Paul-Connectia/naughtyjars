import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://naughty-jars.vual.in/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // Get the token from localStorage dynamically
  const token = localStorage.getItem("token"); // Make sure this key matches where you stored it
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // or "x-api-token": token if your API expects that
  }
  return config;
});

export default axiosInstance;