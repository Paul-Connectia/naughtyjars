import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/crew";

//Add crew
export const createCrew = async (data: any, token: string) => {
  const response = await axios.post(
    `${API_URL}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//List crew
export const getAllCrew = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


//Delete crew
export const deleteCrew = async (id: string) => {
  const token = localStorage.getItem("token"); // get the JWT token
  if (!token) throw new Error("No token found, please login");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
