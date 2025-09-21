const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

module.exports = mongoose.model("MCQ", mcqSchema);
