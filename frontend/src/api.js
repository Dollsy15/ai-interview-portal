import axios from "axios";

// 👇 If running locally:
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// ⏩ Later when deployed, update baseURL to your backend server (Render/EC2/Heroku)

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);