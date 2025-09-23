const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/User");
const CodingSubmission = require("../models/CodingSubmission");
const MCQ = require("../models/MCQ");

// ✅ Get all users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
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
      res.json(submissions);
    } catch (err) {
      res.status(500).json({ error: "Server Error" });
    }
  }
);

// ✅ Get all MCQs
router.get("/mcq", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const questions = await MCQ.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
