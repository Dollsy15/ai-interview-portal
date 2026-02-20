const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // Import middleware

// Temporary static questions
const questions = [
  {
    id: 1,
    question: "Tell me about yourself.",
  },
  {
    id: 2,
    question: "What are your strengths?",
  },
  {
    id: 3,
    question: "Why do you want this job?",
  },
  {
    id: 4,
    question: "Explain a challenging project you worked on.",
  },
];

// 🔐 Protected GET all questions
router.get("/", auth, (req, res) => {
  res.json({
    success: true,
    message: "Questions fetched successfully",
    user: req.user, // shows logged-in user
    questions,
  });
});

module.exports = router;
