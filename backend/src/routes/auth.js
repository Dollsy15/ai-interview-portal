const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ JWT middleware

// ============================
// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
// ============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    // hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ msg: "User registered successfully ✅" });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ============================
// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
// ============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Sign JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ============================
// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
// ============================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // authMiddleware ne req.user.id set kiya hai
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("GetMe Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
