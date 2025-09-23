const express = require("express");
const router = express.Router();
const CodingSubmission = require("../models/CodingSubmission");

// Import middlewares separately
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ==================================================
// ✅ POST: Candidate submits code (must be logged in)
// ==================================================
router.post("/submit", authMiddleware, async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ message: "❌ Code is required!" });
  }

  try {
    const newSubmission = new CodingSubmission({
      user: req.user._id, // ✅ comes from authMiddleware
      code,
      language: language || "javascript",
    });

    await newSubmission.save();

    res.json({
      message: "✅ Code submitted successfully",
      submissionId: newSubmission._id,
    });
  } catch (err) {
    console.error("❌ Error saving submission:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ==================================================
// ✅ GET: Admin fetches all submissions (admin only)
// ==================================================
router.get(
  "/submissions",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const submissions = await CodingSubmission.find()
        .populate("user", "name email role") // fetch user details (excluding password)
        .sort({ createdAt: -1 });

      res.json(submissions);
    } catch (err) {
      console.error("❌ Error fetching submissions:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
