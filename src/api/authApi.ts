import { axiosInstance } from "./baseUrl";

// const API_URL = "https://reqres.in/api"; 

export const loginApi = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};














