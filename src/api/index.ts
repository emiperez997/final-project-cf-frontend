import axios from "axios";

const API_BASE_URL = "https://final-project-cf.vercel.app/api/";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Tiempo máximo de espera para una petición
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
