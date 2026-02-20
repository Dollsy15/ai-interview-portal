const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Submit Answers Route
router.post("/submit-answers", async (req, res) => {
  try {
    const { answers } = req.body;

    const questions = await Question.find();

    let score = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q._id];

      if (
        userAnswer &&
        userAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
      ) {
        score++;
      }
    });

    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
