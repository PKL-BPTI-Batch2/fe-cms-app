import axios from "axios";


const API = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
});
// Interceptor Request: Tambah token otomatis ke header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Interceptor Response: Handle error global
API.interceptors.response.use(
  (res) => res,
  (error) => {
    // Kalau token expired atau tidak valid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Redirect ke halaman login
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
export default API;