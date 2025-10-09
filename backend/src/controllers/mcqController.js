const MCQ = require("../models/MCQ");

// GET all MCQs
exports.getQuestions = async (req, res) => {
  try {
    const questions = await MCQ.find();
    res.json({ success: true, questions });
  } catch (err) {
    console.error("Get MCQ Error:", err.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch questions" });
  }
};

// POST submit answers
exports.submitAnswers = async (req, res) => {
  try {
    const user = req.user; // authenticated user
    const { answers } = req.body; // { questionId: selectedOption }

    const questions = await MCQ.find();
    let score = 0;
    let details = []; // per-question correctness

    questions.forEach((q) => {
      const correct = answers[q._id] && answers[q._id] === q.correctAnswer;
      if (correct) score++;
      details.push({
        questionId: q._id,
        selected: answers[q._id] || null,
        correctAnswer: q.correctAnswer,
        isCorrect: correct,
      });
    });

    // Save score to user
    user.scores.mcq.push(score);
    await user.save();

    res.json({
      success: true,
      total: questions.length,
      score,
      details,
      scores: user.scores.mcq,
    });
  } catch (err) {
    console.error("Submit MCQ Error:", err.message);
    res
      .status(500)
      .json({ success: false, error: "Error while evaluating answers" });
  }
};
