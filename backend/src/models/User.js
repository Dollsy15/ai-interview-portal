const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ✅ role: default "student", can be "student", "candidate", or "admin"
    role: {
      type: String,
      enum: ["student", "candidate", "admin"],
      default: "student",
    },

    // ✅ scores field to track multiple attempts (MCQ & Coding)
    scores: {
      mcq: { type: [Number], default: [] },
      coding: { type: [Number], default: [] },
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
