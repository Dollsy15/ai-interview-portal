const express = require("express");
const router = express.Router();

// Temporary static questions
const questions = [
  {
    id: 1,
    question: "Tell me about yourself."
  },
  {
    id: 2,
    question: "What are your strengths?"
  },
  {
    id: 3,
    question: "Why do you want this job?"
  },
  {
    id: 4,
    question: "Explain a challenging project you worked on."
  }
];

// GET all questions
router.get("/", (req, res) => {
  res.json(questions);
});

module.exports = router;
