const mongoose = require("mongoose");

const codingQuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    category: { type: String },
    sampleInput: { type: String },
    sampleOutput: { type: String },
    starterCode: {
      type: String,
      default: "// Your code here", // ✅ Starter function for every question
    },
    testCases: [
      {
        input: { type: mongoose.Schema.Types.Mixed, required: true },
        expected: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodingQuestion", codingQuestionSchema);
