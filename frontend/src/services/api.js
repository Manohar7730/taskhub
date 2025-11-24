import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // Remove local token and broadcast logout to other tabs/windows
      sessionStorage.removeItem("auth-token");
      // custom event to let AuthProvider react
      try {
        window.dispatchEvent(new CustomEvent("app:logout"));
      } catch (e) {
        console.log(e.message);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
