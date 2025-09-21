// src/api.js
import axios from "axios";

// ✅ Base URL using environment variable (fallback to localhost)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Request Interceptor: automatically attach token for protected requests
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

// ===========================
// 🔐 AUTH APIs
// ===========================

export const registerUser = async (form) => {
  try {
    const res = await API.post("/auth/register", form);
    return res.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (form) => {
  try {
    const res = await API.post("/auth/login", form);
    return res.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const res = await API.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error(
      "Get User Profile Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ===========================
// 📖 INTERVIEW ROUND APIs (future)
// ===========================

export const getMcqQuestions = async () => {
  try {
    const res = await API.get("/mcq");
    return res.data;
  } catch (error) {
    console.error(
      "Get MCQ Questions Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Example for future coding questions
// export const getCodingQuestions = async () => {
//   try {
//     const res = await API.get("/coding");
//     return res.data;
//   } catch (error) {
//     console.error("Get Coding Questions Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

export default API;
