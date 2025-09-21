// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoURI } = require("./config"); // MongoDB connection URI

// Routes
const authRoutes = require("./routes/auth");
const mcqRoutes = require("./routes/mcq"); // ✅ MCQ route

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

// ===========================
// MongoDB Connection
// ===========================
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ===========================
// Server Start
// ===========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
