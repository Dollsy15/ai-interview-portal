const express = require("express");
const router = express.Router();
const MCQ = require("../models/MCQ");
const { getQuestions, submitAnswers } = require("../controllers/mcqController");

// ✅ GET → fetch all MCQs from DB
router.get("/", getQuestions);

// ✅ POST → submit answers and calculate score
router.post("/submit", submitAnswers);

router.post("/add", async (req, res) => {
  try {
    const questions = req.body; // array of MCQs
    const inserted = await MCQ.insertMany(questions);
    res.json({ success: true, inserted });
  } catch (err) {
    console.error("Add MCQ Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
