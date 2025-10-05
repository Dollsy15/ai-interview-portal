const express = require("express");
const router = express.Router();
const CodingSubmission = require("../models/CodingSubmission");
const CodingQuestion = require("../models/CodingQuestion");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// POST → Submit candidate code
router.post("/submit", authMiddleware, async (req, res) => {
  const { code, language } = req.body;

  if (!code) return res.status(400).json({ message: "Code is required" });

  try {
    const submission = new CodingSubmission({
      user: req.user._id,
      code,
      language: language || "javascript",
    });
    await submission.save();
    res.json({ success: true, message: "Code submitted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET → All submissions (admin only)
router.get(
  "/submissions",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const submissions = await CodingSubmission.find()
        .populate("user", "name email role")
        .sort({ createdAt: -1 });
      res.json(submissions);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// GET → All coding questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await CodingQuestion.find().sort({ createdAt: 1 });
    res.json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST → Add coding questions (admin only)
router.post(
  "/questions/add",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const questions = req.body; // array of questions
      const inserted = await CodingQuestion.insertMany(questions);
      res.json({ success: true, inserted });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

module.exports = router;
