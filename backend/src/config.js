require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-portal",
  jwtSecret: process.env.JWT_SECRET || "supersecretkey123",
};