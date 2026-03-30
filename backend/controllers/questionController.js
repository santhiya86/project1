const Question = require("../models/Question");

// Add question
exports.addQuestion = async (req, res) => {
  try {

    const { questionText, type } = req.body;

    const newQuestion = new Question({
      questionText,
      type
    });

    await newQuestion.save();

    res.json({
      message: "Question added successfully",
      question: newQuestion
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding question",
      error: error.message
    });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {

    const questions = await Question.find();

    res.json({
      message: "Questions fetched successfully",
      questions
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};