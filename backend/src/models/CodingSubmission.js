const mongoose = require("mongoose");

const CodingSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },

    // ✅ candidate's submitted code
    code: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ optionally store programming language (future support)
    language: {
      type: String,
      default: "javascript",
    },

    // ✅ evaluation score for this submission
    score: {
      type: Number,
      default: null, // null means not yet evaluated
    },

    // createdAt & updatedAt automatic from timestamps option
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodingSubmission", CodingSubmissionSchema);
