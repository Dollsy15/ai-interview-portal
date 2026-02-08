const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory DB
const users = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Signup route
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill all fields" });
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password }); // TODO: hash password
  res.json({ message: "Signup successful" });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
