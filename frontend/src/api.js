import axios from "axios";

// ✅ Base URL using environment variable (fallback to localhost)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Request Interceptor: auto attach token
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: auto logout on 401
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // force re-login
    }
    return Promise.reject(error);
  }
);

// ===========================
// 🔐 AUTH APIs
// ===========================

export const registerUser = async (form) => {
  const res = await API.post("/auth/register", form);
  return res.data;
};

export const loginUser = async (form) => {
  const res = await API.post("/auth/login", form);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

// ===========================
// 📊 SCORES APIs
// ===========================

export const addUserScore = async (type, value) => {
  // type = "mcq" or "coding"
  const res = await API.post("/auth/score", { type, value });
  return res.data;
};

// ===========================
// 📖 INTERVIEW APIs (future)
// ===========================

export const getMcqQuestions = async () => {
  const res = await API.get("/mcq");
  return res.data;
};

// API helper function
export const submitCodingAnswer = async (data) => {
  return axios.post("http://localhost:5000/api/coding/submit", data);
};

// Example for future coding questions
// export const getCodingQuestions = async () => {
//   const res = await API.get("/coding");
//   return res.data;
// };

export default API;
