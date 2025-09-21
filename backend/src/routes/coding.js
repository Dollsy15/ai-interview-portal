const express = require("express");
const router = express.Router();
const CodingSubmission = require("../models/CodingSubmission");

// @route   POST /api/coding/submit
// @desc    Save coding round submission
router.post("/submit", async (req, res) => {
  const { code, userId } = req.body; // userId should be passed from frontend (or use token later)

  if (!code) {
    return res.status(400).json({ message: "❌ Code is required!" });
  }

  try {
    const newSubmission = new CodingSubmission({
      user: userId || null, // fallback if user not provided yet
      code,
    });

    await newSubmission.save();

    return res.json({
      message: "✅ Code submitted successfully",
      submissionId: newSubmission._id,
    });
  } catch (err) {
    console.error("❌ Error saving submission:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
