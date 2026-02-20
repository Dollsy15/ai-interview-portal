const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    stats: {
      interviewsTaken: {
        type: Number,
        default: 0,
      },
      avgScore: {
        type: Number,
        default: 0,
      },
      questionsPracticed: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);