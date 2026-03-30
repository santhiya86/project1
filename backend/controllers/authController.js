const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register Controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};