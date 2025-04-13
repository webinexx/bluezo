import axios from "axios";

// Toggle this to "prod" or "local" as needed
const ENV = "prod"; // or "prod"

const baseURLs = {
  local: "http://localhost:4000/api",
  prod: "https://api.testabm.shop/api",
};

const api = axios.create({
  baseURL: baseURLs[ENV],
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
