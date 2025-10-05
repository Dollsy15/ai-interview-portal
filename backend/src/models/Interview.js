const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  wordCount: {
    type: Number,
    default: 0,
  },
});

const EvaluationSchema = new mongoose.Schema({
  overallScore: {
    type: Number,
    required: true,
  },
  communicationScore: {
    type: Number,
    required: true,
  },
  contentScore: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  strengths: [String],
  areasForImprovement: [String],
  totalQuestions: Number,
  averageWordsPerAnswer: Number,
  analyzedAt: {
    type: Date,
    default: Date.now,
  },
});

const InterviewSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interviewType: {
      type: String,
      enum: ["behavioral", "technical", "mixed"],
      default: "behavioral",
    },
    questions: [
      {
        id: String,
        text: String,
        type: String,
        difficulty: String,
      },
    ],
    responses: [ResponseSchema],
    evaluation: EvaluationSchema,
    duration: {
      type: Number, // in seconds
      default: 0,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "evaluated"],
      default: "in-progress",
    },
    settings: {
      questionCount: { type: Number, default: 5 },
      difficulty: { type: String, default: "medium" },
      timeLimit: { type: Number, default: 1800 }, // 30 minutes
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
InterviewSessionSchema.index({ userId: 1, createdAt: -1 });
InterviewSessionSchema.index({ sessionId: 1 });

module.exports = mongoose.model("Interview", InterviewSessionSchema);
