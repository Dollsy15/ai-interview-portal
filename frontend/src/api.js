import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Attach token
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => Promise.reject(error)
);

// Logout on 401
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

// AUTH
export const registerUser = (form) =>
  API.post("/auth/register", form).then((res) => res.data);
export const loginUser = (form) =>
  API.post("/auth/login", form).then((res) => res.data);
export const getUserProfile = () => API.get("/auth/me").then((res) => res.data);

// SCORES
export const addUserScore = (type, value) =>
  API.post("/auth/score", { type, value }).then((res) => res.data);

// MCQ
export const getMcqQuestions = () => API.get("/mcq").then((res) => res.data);
export const submitMcqAnswers = (data) =>
  API.post("/mcq/submit", data).then((res) => res.data); // <-- Added this

// CODING
export const getCodingQuestions = () =>
  API.get("/coding/questions").then((res) => res.data);
export const submitCodingAnswer = (data) =>
  API.post("/coding/submit", data).then((res) => res.data);
export const getCodingSubmissions = () =>
  API.get("/coding/submissions").then((res) => res.data);

export default API;
