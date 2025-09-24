const MCQ = require("../models/MCQ");

// ✅ GET all MCQs
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

// ✅ POST submit answers
exports.submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // format: { "questionId": "selectedOption" }
    const questions = await MCQ.find();

    let score = 0;
    questions.forEach((q) => {
      if (answers[q._id] && answers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    res.json({ success: true, total: questions.length, score });
  } catch (err) {
    console.error("Submit MCQ Error:", err.message);
    res
      .status(500)
      .json({ success: false, error: "Error while evaluating answers" });
  }
};
