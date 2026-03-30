const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Add question
router.post("/add", async (req, res) => {
  try {
    const { type, question, correctAnswer } = req.body;
    if (!type || !question || !correctAnswer)
      return res.status(400).json({ message: "All fields are required" });

    const newQuestion = new Question({ type, question, correctAnswer });
    await newQuestion.save();
    res.json({ message: "Question saved successfully", data: newQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;