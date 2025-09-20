// backend/db.js
const mongoose = require("mongoose");

// Local MongoDB connection string
const uri = "mongodb://127.0.0.1:27017/aiInterviewPortal";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected locally"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;
