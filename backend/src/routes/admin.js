// routes/admin.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/User");
const CodingSubmission = require("../models/CodingSubmission");
const MCQ = require("../models/MCQ");

/**
 * ====================
 *  ADMIN ROUTES
 * ====================
 */

// ✅ Get all users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ Get all coding submissions
router.get(
  "/coding-submissions",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const submissions = await CodingSubmission.find().populate(
        "user",
        "name email"
      );
      res.json({ success: true, submissions });
    } catch (err) {
      console.error("Get Coding Submissions Error:", err.message);
      res.status(500).json({ success: false, msg: "Server Error" });
    }
  }
);

// ✅ Get all MCQs
router.get("/mcq", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const questions = await MCQ.find();
    res.json({ success: true, questions });
  } catch (err) {
    console.error("Get MCQ Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = router;
