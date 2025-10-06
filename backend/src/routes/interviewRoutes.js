const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Interview = require("../models/Interview");

// Sample questions database
const behavioralQuestions = [
  "Tell me about a time you faced a significant challenge at work and how you handled it.",
  "Describe a situation where you had to work with a difficult team member.",
  "Give an example of how you set goals and achieve them.",
  "Tell me about a time you made a mistake and what you learned from it.",
  "Describe a situation where you showed leadership skills.",
  "How do you handle tight deadlines and pressure?",
  "Tell me about a time you had to convince someone to see things your way.",
  "Describe a situation where you had to learn something new quickly.",
  "Give an example of how you handled a conflict within your team.",
  "Tell me about your biggest professional achievement.",
];

const technicalQuestions = [
  "Explain the concept of closures in JavaScript.",
  "What is the difference between let, const, and var?",
  "How does React's virtual DOM work?",
  "What are promises in JavaScript and how do they work?",
  "Explain the concept of hoisting in JavaScript.",
  "What is the difference between == and === in JavaScript?",
  "How would you optimize website performance?",
  "Explain the concept of RESTful APIs.",
  "What are the different HTTP methods and when to use them?",
  "How do you handle errors in JavaScript?",
];

// Generate interview questions
router.post("/generate-questions", authMiddleware, async (req, res) => {
  try {
    const { type = "behavioral", count = 5, difficulty = "medium" } = req.body;

    let questionPool = [];
    switch (type) {
      case "behavioral":
        questionPool = behavioralQuestions;
        break;
      case "technical":
        questionPool = technicalQuestions;
        break;
      case "mixed":
        questionPool = [...behavioralQuestions, ...technicalQuestions];
        break;
      default:
        questionPool = behavioralQuestions;
    }

    // Shuffle and select questions
    const selectedQuestions = questionPool
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
      .map((text, index) => ({
        id: `q${index + 1}`,
        text,
        type,
        difficulty,
        timestamp: new Date(),
      }));

    // Create new interview session
    const interviewSession = new Interview({
      sessionId: generateSessionId(),
      userId: req.user._id,
      interviewType: type,
      questions: selectedQuestions,
      status: "in-progress",
      settings: {
        questionCount: count,
        difficulty,
        timeLimit: 1800, // 30 minutes
      },
    });

    await interviewSession.save();

    res.json({
      success: true,
      questions: selectedQuestions,
      sessionId: interviewSession.sessionId,
      count: selectedQuestions.length,
      type,
      difficulty,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate questions",
      message: error.message,
    });
  }
});

// Save interview response
router.post("/save-response", authMiddleware, async (req, res) => {
  try {
    // Ensure body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "Request body is missing",
      });
    }

    // Use destructuring safely
    const { sessionId, questionId, question, answer } = req.body || {};

    // Validate input
    if (!sessionId || !questionId || !question || !answer) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Find interview session
    const interview = await Interview.findOne({
      sessionId,
      userId: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: "Interview session not found",
      });
    }

    // Calculate word count
    const wordCount = answer.split(/\s+/).filter((w) => w.length > 0).length;

    // Add or update response
    const existingResponse = interview.responses.find(
      (r) => r.questionId === questionId
    );

    if (existingResponse) {
      existingResponse.answer = answer;
      existingResponse.wordCount = wordCount;
      existingResponse.timestamp = new Date();
    } else {
      interview.responses.push({
        questionId,
        question,
        answer,
        wordCount,
        timestamp: new Date(),
      });
    }

    // Save session
    await interview.save();

    res.json({
      success: true,
      message: "Response saved successfully",
      sessionId,
      questionId,
      wordCount,
    });
  } catch (err) {
    console.error("Error saving response:", err);
    res.status(500).json({
      success: false,
      error: "Failed to save response",
      message: err.message,
    });
  }
});

// Evaluate interview
router.post("/evaluate", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;

    const interview = await Interview.findOne({
      sessionId,
      userId: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: "Interview session not found",
      });
    }

    // Analyze responses
    const evaluation = await analyzeResponses(
      interview.responses,
      interview.interviewType
    );

    // Update interview with evaluation
    interview.evaluation = evaluation;
    interview.status = "evaluated";
    interview.duration = Math.floor((new Date() - interview.createdAt) / 1000);

    await interview.save();

    res.json({
      success: true,
      evaluation,
      sessionId: interview.sessionId,
      interviewType: interview.interviewType,
      evaluatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error evaluating interview:", error);
    res.status(500).json({
      success: false,
      error: "Failed to evaluate interview",
    });
  }
});

// Get interview history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    // Ensure user exists
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    // Fetch last 10 evaluated interviews with questions included
    const interviews = await Interview.find({
      userId: req.user._id,
      status: "evaluated",
    })
      .sort({ createdAt: -1 })
      .select(
        "sessionId interviewType evaluation duration createdAt status questions"
      )
      .limit(10);

    // Map to history format safely
    const history = interviews.map((interview) => ({
      sessionId: interview.sessionId || "",
      type: interview.interviewType || "",
      score: interview.evaluation?.overallScore || 0,
      date: interview.createdAt || new Date(),
      duration: formatDuration(interview.duration),
      totalQuestions: interview.questions?.length || 0,
      status: interview.status || "unknown",
    }));

    res.status(200).json({
      success: true,
      history,
      totalSessions: history.length,
    });
  } catch (error) {
    console.error("❌ Error fetching interview history:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch interview history",
      message: error.message, // optional, useful for debugging
    });
  }
});

// Get specific interview details
router.get("/session/:sessionId", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.params;

    const interview = await Interview.findOne({
      sessionId,
      userId: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: "Interview session not found",
      });
    }

    res.json({
      success: true,
      session: interview,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch session details",
    });
  }
});

// Helper function to analyze responses
async function analyzeResponses(responses, interviewType) {
  const totalWords = responses.reduce((sum, r) => sum + (r.wordCount || 0), 0);
  const avgWords = responses.length > 0 ? totalWords / responses.length : 0;

  let overallScore = 0;
  let communicationScore = 0;
  let contentScore = 0;

  responses.forEach((response) => {
    const wordCount = response.wordCount || 0;

    // Communication score based on length and structure
    let commScore = Math.min(100, wordCount * 1.5);
    if (wordCount > 100) commScore = 85;
    if (wordCount > 200) commScore = 92;
    if (wordCount < 30) commScore = 40;

    // Content score (simulated - integrate with OpenAI for real analysis)
    const contScore = Math.min(100, 70 + Math.random() * 30);

    communicationScore += commScore;
    contentScore += contScore;
  });

  if (responses.length > 0) {
    communicationScore = Math.round(communicationScore / responses.length);
    contentScore = Math.round(contentScore / responses.length);
    overallScore = Math.round((communicationScore + contentScore) / 2);
  }

  // Generate feedback
  let feedback = generateFeedback(overallScore, avgWords, interviewType);

  return {
    overallScore,
    communicationScore,
    contentScore,
    feedback,
    strengths: getStrengths(overallScore),
    areasForImprovement: getImprovementAreas(overallScore),
    totalQuestions: responses.length,
    averageWordsPerAnswer: Math.round(avgWords),
    analyzedAt: new Date().toISOString(),
  };
}

function generateFeedback(score, avgWords, type) {
  if (score >= 90)
    return "Outstanding! Your responses demonstrate excellent communication skills and deep understanding.";
  if (score >= 80)
    return "Excellent performance! Well-structured answers with good examples and clarity.";
  if (score >= 70)
    return "Good job! Your answers are clear but could benefit from more specific examples.";
  if (score >= 60)
    return "Satisfactory. Focus on providing more detailed examples and structuring your answers better.";
  return "Needs practice. Work on providing more comprehensive answers with specific examples and outcomes.";
}

function getStrengths(score) {
  const strengths = [
    "Clear communication",
    "Good examples",
    "Structured responses",
    "Relevant experience",
    "Positive attitude",
  ];
  return strengths.slice(0, Math.ceil(score / 25));
}

function getImprovementAreas(score) {
  const areas = [
    "Add more specific metrics",
    "Use STAR method consistently",
    "Elaborate on outcomes",
    "Provide more technical details",
    "Improve answer structure",
  ];
  return areas.slice(0, Math.floor((100 - score) / 25));
}

function generateSessionId() {
  return (
    "INT" + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase()
  );
}

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

module.exports = router;
