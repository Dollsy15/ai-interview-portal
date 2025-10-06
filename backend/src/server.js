const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const mcqRoutes = require("./routes/mcq");
const codingRoutes = require("./routes/coding");
const interviewRoutes = require("./routes/interviewRoutes");

const { mongoURI } = require("./config");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mcq", mcqRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/interviews", interviewRoutes);

// Basic health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "✅ AI Interview Portal API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// MongoDB Connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 404 handler (any route not matched)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
