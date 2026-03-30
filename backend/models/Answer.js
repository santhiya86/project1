const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  interviewId: { type: String, required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Answer", answerSchema);