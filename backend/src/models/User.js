const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "candidate", "admin", "user"],
      default: "student",
    },
    scores: {
      mcq: { type: [Number], default: [] },
      coding: { type: [Number], default: [] },
    },
    // ✅ Password reset fields
    resetOTP: String,
    resetOTPExpiry: Date,
    refreshToken: String, // optional for JWT refresh
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
