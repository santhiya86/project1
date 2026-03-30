const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  interviewId: { type: Number, required: true },
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date }
});

module.exports = mongoose.model("Interview", interviewSchema);