const Interview = require("../models/Interview");

exports.startInterview = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Generate a random interview ID
    const interviewId = Math.floor(Math.random() * 100000);

    const newInterview = new Interview({
      userId,
      interviewId
    });

    await newInterview.save();

    res.json({
      message: "Interview started successfully",
      interview: newInterview
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};