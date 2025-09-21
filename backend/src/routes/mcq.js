const express = require("express");
const router = express.Router();

// ✅ Static MCQ questions
const mcqQuestions = [
  {
    _id: "q1",
    question: "What does AI stand for?",
    options: [
      "Artificial Intelligence",
      "Automated Interface",
      "Applied Innovation",
      "Algorithmic Integration",
    ],
    answer: "Artificial Intelligence",
  },
  {
    _id: "q2",
    question: "Which language is commonly used for AI development?",
    options: ["Python", "HTML", "CSS", "JavaScript"],
    answer: "Python",
  },
  {
    _id: "q3",
    question: "Which of the following is a supervised learning algorithm?",
    options: [
      "Linear Regression",
      "K-Means Clustering",
      "Principal Component Analysis",
      "Apriori Algorithm",
    ],
    answer: "Linear Regression",
  },
  {
    _id: "q4",
    question: "What is the main purpose of Natural Language Processing (NLP)?",
    options: [
      "Process human language",
      "Store databases",
      "Render graphics",
      "Manage servers",
    ],
    answer: "Process human language",
  },
  {
    _id: "q5",
    question: "Which framework is used for deep learning?",
    options: ["TensorFlow", "React", "Node.js", "Bootstrap"],
    answer: "TensorFlow",
  },
];

// ✅ GET /api/mcq → return questions
router.get("/", (req, res) => {
  res.json(mcqQuestions);
});

// ✅ POST /api/mcq/submit → evaluate answers
router.post("/submit", (req, res) => {
  const { answers } = req.body; // { q1: "Python", q2: "..." }
  let score = 0;

  mcqQuestions.forEach((q) => {
    if (answers[q._id] && answers[q._id] === q.answer) {
      score++;
    }
  });

  res.json({
    total: mcqQuestions.length,
    score,
  });
});

module.exports = router;
