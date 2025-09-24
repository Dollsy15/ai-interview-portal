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
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodingQuestion", codingQuestionSchema);
