// src/api.js
import axios from "axios";

// ✅ Base URL
// Local development: localhost:5000
// Deployment time: replace with your hosted backend URL (e.g. "https://my-app.onrender.com/api")
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Interceptor: automatically token attach karega har protected request me
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ===========================
// 🔐 AUTH APIs
// ===========================

// Register new user
export const registerUser = async (form) => {
  const res = await API.post("/auth/register", form);
  return res.data;
};

// Login user
export const loginUser = async (form) => {
  const res = await API.post("/auth/login", form);
  return res.data;
};

// Get current logged-in user (protected)
export const getUserProfile = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

// ===========================
// 📖 INTERVIEW ROUND APIs (future)
// ===========================

// Example: fetch MCQ questions (protected)
export const getMcqQuestions = async () => {
  const res = await API.get("/mcq");
  return res.data;
};

// Example: fetch coding round questions
// export const getCodingQuestions = async () => {
//   const res = await API.get("/coding");
//   return res.data;
// };
