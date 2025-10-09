import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // supaya cookie ikut terkirim
});



API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // kalau sesi tidak valid
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default API;
