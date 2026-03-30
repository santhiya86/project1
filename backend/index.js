const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Fix for Node 22 dotenv issue
require("dotenv/config");  // <-- important

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

// Test route
app.get("/", (req, res) => res.send("Server is working"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log("MongoDB connection error:", err));