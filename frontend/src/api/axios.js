import axios from "axios";

const rawBaseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const normalizedBaseURL = rawBaseURL.replace(/\/+$|\/api\/+$/g, "");
const baseURL = normalizedBaseURL.endsWith("/api")
  ? normalizedBaseURL
  : `${normalizedBaseURL}/api`;

const instance = axios.create({
  baseURL,
});

// This interceptor runs before EVERY request.
// It reads the token from localStorage and adds it to the Authorization headers.
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
