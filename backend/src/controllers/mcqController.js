const MCQ = require("../models/MCQ");

// ✅ Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await MCQ.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

// ✅ Submit answers & calculate score
exports.submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // {questionId: selectedOption}
    const questions = await MCQ.find();

    let score = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.answer) {
        score++;
      }
    });

    res.json({ total: questions.length, score });
  } catch (err) {
    res.status(500).json({ error: "Error while evaluating answers" });
  }
};
