const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const User = require("../models/User");
const MCQ = require("../models/MCQ");
const codingQuestions = require("../models/codingQuestions");

/**
 * ====================
 *  Admin APIs
 * ====================
 */

// ✅ GET all users (Admin only)
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    console.error("Admin Fetch Users Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ ADD new MCQ
router.post("/mcq", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { question, options, correctAnswer, category, difficulty } = req.body;

    if (!question || !options || !correctAnswer) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields required" });
    }

    const mcq = new MCQ({
      question,
      options,
      correctAnswer,
      category,
      difficulty,
    });
    await mcq.save();

    res.status(201).json({ success: true, msg: "MCQ added ✅", mcq });
  } catch (err) {
    console.error("Admin Add MCQ Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ GET all MCQs (NEW route)
router.get("/mcq", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const mcqs = await MCQ.find().sort({ createdAt: -1 });
    res.json({ success: true, count: mcqs.length, mcqs });
  } catch (err) {
    console.error("Admin Get MCQs Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ UPDATE MCQ (Admin Only)
router.put("/mcq/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { question, options, correctAnswer, category, difficulty } = req.body;

    const updatedMcq = await MCQ.findByIdAndUpdate(
      req.params.id,
      { question, options, correctAnswer, category, difficulty },
      { new: true, runValidators: true }
    );

    if (!updatedMcq) {
      return res.status(404).json({ success: false, msg: "MCQ not found ❌" });
    }

    res.json({ success: true, msg: "MCQ updated ✅", mcq: updatedMcq });
  } catch (err) {
    console.error("Admin Update MCQ Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ DELETE MCQ (Admin Only)
router.delete("/mcq/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedMcq = await MCQ.findByIdAndDelete(req.params.id);

    if (!deletedMcq) {
      return res.status(404).json({ success: false, msg: "MCQ not found ❌" });
    }

    res.json({ success: true, msg: "MCQ deleted ✅" });
  } catch (err) {
    console.error("Admin Delete MCQ Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ ADD new Coding Question (Admin Only)
router.post("/coding", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      category,
      sampleInput,
      sampleOutput,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, msg: "Title and description are required" });
    }

    const codingQ = new codingQuestions({
      title,
      description,
      difficulty,
      category,
      sampleInput,
      sampleOutput,
    });

    await codingQ.save();

    res
      .status(201)
      .json({ success: true, msg: "Coding Question added ✅", codingQ });
  } catch (err) {
    console.error("🔥 Admin Add Coding Error Full:", err);
    res
      .status(500)
      .json({ success: false, msg: err.message || "Server Error" });
  }
});

// ✅ GET all Coding Questions (Admin Only)
router.get("/coding", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const codingQs = await codingQuestions.find().sort({ createdAt: -1 });
    res.json({ success: true, count: codingQs.length, codingQs });
  } catch (err) {
    console.error("Admin Get Coding Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ UPDATE Coding Question (Admin Only)
router.put("/coding/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      category,
      sampleInput,
      sampleOutput,
    } = req.body;

    const updatedCodingQ = await codingQuestions.findByIdAndUpdate(
      req.params.id,
      { title, description, difficulty, category, sampleInput, sampleOutput },
      { new: true, runValidators: true }
    );

    if (!updatedCodingQ) {
      return res
        .status(404)
        .json({ success: false, msg: "Coding Question not found ❌" });
    }

    res.json({
      success: true,
      msg: "Coding Question updated ✅",
      codingQ: updatedCodingQ,
    });
  } catch (err) {
    console.error("Admin Update Coding Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

// ✅ DELETE Coding Question (Admin Only)
router.delete(
  "/coding/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const deletedCodingQ = await codingQuestions.findByIdAndDelete(
        req.params.id
      );

      if (!deletedCodingQ) {
        return res
          .status(404)
          .json({ success: false, msg: "Coding Question not found ❌" });
      }

      res.json({ success: true, msg: "Coding Question deleted ✅" });
    } catch (err) {
      console.error("Admin Delete Coding Error:", err.message);
      res.status(500).json({ success: false, msg: "Server Error" });
    }
  }
);

module.exports = router;
