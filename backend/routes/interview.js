const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // make sure you have this

// Submit Answers Route
router.post("/submit-answers", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id; // from auth middleware

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

    const totalQuestions = questions.length;
    const percentageScore = totalQuestions
      ? Math.round((score / totalQuestions) * 100)
      : 0;

    // ✅ Update User Stats
    const user = await User.findById(userId);

    if (user) {
      const prevInterviews = user.stats.interviewsTaken;
      const prevAvg = user.stats.avgScore;

      const newInterviews = prevInterviews + 1;

      // Proper average formula
      const newAvg =
        (prevAvg * prevInterviews + percentageScore) / newInterviews;

      user.stats.interviewsTaken = newInterviews;
      user.stats.avgScore = Math.round(newAvg);
      user.stats.questionsPracticed += totalQuestions;

      await user.save();
    }

    res.json({
      score: percentageScore,
      totalQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
