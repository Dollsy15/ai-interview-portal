// src/api.js
import axios from "axios";

// ✅ Base URL (local ke liye, jab tak tum deploy nahi karti)
// Deployment ke time isse backend deployed link se replace karna hoga
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Interceptor: automatically token attach karega har request me
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Auth APIs
export const registerUser = (form) =>
  API.post("/auth/register", form).then((res) => res.data);

export const loginUser = (form) =>
  API.post("/auth/login", form).then((res) => res.data);

// ✅ Example: future protected APIs
export const getUserProfile = () => API.get("/auth/me").then((res) => res.data);

export const getMcqQuestions = () => API.get("/mcq").then((res) => res.data);
