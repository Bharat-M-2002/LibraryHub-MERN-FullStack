import axios from "axios";
import { getToken } from "./authService"; // ✅ named import

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ IMPORTANT: include /api
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// JWT INTERCEPTOR
// =====================
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
