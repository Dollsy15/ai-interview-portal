import axios from "axios";

// ✅ Axios instance with baseURL & interceptors
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ Logout on invalid token
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 🔐 AUTH APIs
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

// 📊 SCORES API
export const addUserScore = async (type, value) => {
  const res = await API.post("/auth/score", { type, value });
  return res.data;
};

// 📝 MCQ
export const getMcqQuestions = async () => {
  const res = await API.get("/mcq");
  return res.data;
};

// 💻 CODING
export const submitCodingAnswer = async (data) => {
  const res = await API.post("/coding/submit", data);
  return res.data;
};

export const getCodingSubmissions = async () => {
  const res = await API.get("/coding/submissions");
  return res.data;
};

export default API;
