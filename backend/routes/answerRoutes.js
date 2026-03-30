const express = require("express");
const router = express.Router();

const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Result = require("../models/Result");


// Save Answer
router.post("/save", async (req, res) => {

  const { userId, interviewId, questionId, answer } = req.body;

  const newAnswer = new Answer({
    userId,
    interviewId,
    questionId,
    answer
  });

  await newAnswer.save();

  res.json({
    message: "Answer saved successfully",
    data: newAnswer
  });

});



// Submit Interview
router.post("/submit", async (req, res) => {

  const { userId, interviewId } = req.body;

  const answers = await Answer.find({ userId, interviewId });

  if (answers.length === 0) {
    return res.json({ message: "No answers found" });
  }

  let score = 0;

  for (let ans of answers) {

    const question = await Question.findById(ans.questionId);

    if (
      question &&
      ans.answer.toLowerCase() === question.correctAnswer.toLowerCase()
    ) {
      score++;
    }

  }

  // Save Result
  const result = new Result({
    userId,
    interviewId,
    score,
    totalQuestions: answers.length
  });

  await result.save();

  res.json({
    message: "Interview submitted successfully",
    score,
    totalQuestions: answers.length
  });

});


module.exports = router;