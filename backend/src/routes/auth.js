const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * ====================
 *  UNIVERSAL REGISTER (User/Admin)
 * ====================
 * If role not passed, default is "user"
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "user", // 👈 accepts role if provided
    });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, jwtSecret, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      msg: `${newUser.role} registered successfully ✅`,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        scores: newUser.scores,
      },
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res
      .status(500)
      .json({ success: false, msg: "Server Error", error: err.message });
  }
});

/**
 * ====================
 *  LOGIN (User/Admin)
 * ====================
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      msg: "Login successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        scores: user.scores,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res
      .status(500)
      .json({ success: false, msg: "Server Error", error: err.message });
  }
});

/**
 * ====================
 *  GET CURRENT USER (Protected)
 * ====================
 */
router.get("/me", authMiddleware, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, msg: "Unauthorized" });
  }
  res.json({ success: true, user: req.user });
});

/**
 * ====================
 *  ADD SCORE (User only example)
 * ====================
 */
router.post("/score", authMiddleware, async (req, res) => {
  try {
    const { type, value } = req.body;
    const user = req.user;

    if (!type || value === undefined) {
      return res
        .status(400)
        .json({ success: false, msg: "Type and value are required" });
    }

    if (type === "mcq") user.scores.mcq.push(value);
    else if (type === "coding") user.scores.coding.push(value);
    else {
      return res
        .status(400)
        .json({
          success: false,
          msg: "Invalid type, must be 'mcq' or 'coding'",
        });
    }

    await user.save();
    res.json({ success: true, msg: "Score added ✅", scores: user.scores });
  } catch (err) {
    console.error("Add Score Error:", err.message);
    res
      .status(500)
      .json({ success: false, msg: "Server Error", error: err.message });
  }
});

module.exports = router;
