// routes/coding.js
const express = require("express");
const router = express.Router();
const CodingSubmission = require("../models/CodingSubmission");

// ✅ GET all submissions
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await CodingSubmission.find()
      .populate("user", "name email") // populate user details
      .sort({ createdAt: -1 });

    res.json(submissions); // send JSON
  } catch (err) {
    console.error("❌ Error fetching submissions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST route already exists
router.post("/submit", async (req, res) => {
  const { code, userId } = req.body;

  if (!code) {
    return res.status(400).json({ message: "❌ Code is required!" });
  }

  try {
    const newSubmission = new CodingSubmission({
      user: userId || null,
      code,
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

module.exports = router;