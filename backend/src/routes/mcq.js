const express = require("express");
const router = express.Router();
const { getQuestions, submitAnswers } = require("../controllers/mcqController");

// ✅ GET → fetch all MCQs from DB
router.get("/", getQuestions);

// ✅ POST → submit answers and calculate score
router.post("/submit", submitAnswers);

module.exports = router;
