const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ load variables from .env

// Routes
const authRoutes = require("./routes/auth");
const mcqRoutes = require("./routes/mcq");
const codingRoutes = require("./routes/coding");

const app = express();

// ===========================
// Middleware
// ===========================
app.use(cors());
app.use(express.json()); // Parse JSON requests

// ===========================
// Routes
// ===========================
app.use("/api/auth", authRoutes);
app.use("/api/mcq", mcqRoutes);
app.use("/api/coding", codingRoutes); // ✅ Coding Round route

// ===========================
// MongoDB Connection
// ===========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ===========================
// Server Start
// ===========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
