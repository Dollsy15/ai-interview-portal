const express = require("express");
const router = express.Router();
const CodingSubmission = require("../models/CodingSubmission");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

// ✅ POST: Candidate submits code (must be logged in)
router.post("/submit", authMiddleware, async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ message: "❌ Code is required!" });
  }

  try {
    const newSubmission = new CodingSubmission({
      user: req.user._id, // ✅ User attached from authMiddleware
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

// ✅ GET: Admin fetches all submissions (must be admin)
router.get(
  "/submissions",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const submissions = await CodingSubmission.find()
        .populate("user", "name email role") // fetch user details
        .sort({ createdAt: -1 });

      res.json(submissions);
    } catch (err) {
      console.error("❌ Error fetching submissions:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
