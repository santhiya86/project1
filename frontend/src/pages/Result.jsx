import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";

const Result = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = JSON.parse(localStorage.getItem("lastResult"));
    if (!storedResult) navigate("/");
    else setResult(storedResult);
  }, [navigate]);

  if (!result) return null;

  const { type, subject, difficulty, questions, answers, timeTaken } = result;

  // Score calculation
  const scores = answers.map((ans) =>
    ans.trim().length > 20 ? 1 : ans.trim().length > 5 ? 0.5 : 0
  );
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const percentage = Math.round((totalScore / questions.length) * 100);

  const performance =
    percentage >= 80
      ? "Excellent"
      : percentage >= 60
      ? "Good"
      : percentage >= 40
      ? "Average"
      : "Needs Improvement";

  const getFeedback = (score) => {
    if (score === 1) return "Well Done!";
    if (score === 0.5) return "Could Be Better";
    return "Needs Improvement";
  };

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  // Dynamic feedback content based on type
  const feedbackContent = {
    Technical: {
      strengths: [
        `Strong understanding of ${subject} concepts`,
        "Logical problem-solving approach",
        "Good code structuring"
      ],
      improve: [
        `Provide clearer explanations in ${subject}`,
        "Optimize code efficiency",
        "Use more real-world examples"
      ]
    },
    HR: {
      strengths: [
        "Confident communication",
        "Clear career goals",
        "Positive attitude"
      ],
      improve: [
        "Provide structured answers",
        "Give specific examples",
        "Improve storytelling clarity"
      ]
    },
    Behavioral: {
      strengths: [
        "Good situational handling",
        "Teamwork awareness",
        "Leadership understanding"
      ],
      improve: [
        "Use STAR method clearly",
        "Provide measurable outcomes",
        "Explain conflict resolution better"
      ]
    }
  };

  const currentFeedback = feedbackContent[type];

  return (
    <div className="resultContainer">
      <div className="resultCard">
        <h2>
          {type} Interview Result{" "}
          {type === "Technical" ? `- ${subject} (${difficulty})` : ""}
        </h2>

        <div className="scoreSection">
          <div>
            <h1>
              Score: {totalScore} / {questions.length} ({percentage}%)
            </h1>
            <p className="performance">Performance: {performance}</p>
            <p className="timeTaken">
              Time Taken: {minutes} min {seconds} sec
            </p>
          </div>

          <div className="circleWrap">
            <div
              className="circle"
              style={{
                background: `conic-gradient(#22c55e ${percentage * 3.6}deg, #e5e7eb 0deg)`
              }}
            >
              <div className="circleInner">{percentage}%</div>
            </div>
          </div>
        </div>

        <div className="feedbackSection">
          <div className="strengthBox">
            <h3>✔ Strengths</h3>
            <ul>
              {currentFeedback.strengths.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="improveBox">
            <h3>⚠ Areas to Improve</h3>
            <ul>
              {currentFeedback.improve.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="breakdown">
          <h3>Question-wise Breakdown</h3>
          {questions.map((q, idx) => (
            <div key={idx} className="breakdownItem">
              <p>
                <strong>Q{idx + 1}:</strong> {q.question}
              </p>
              <p>
                <strong>Answer:</strong> {answers[idx]}
              </p>
              <p>
                <strong>Score:</strong> {scores[idx]} / 1 — {getFeedback(scores[idx])}
              </p>
            </div>
          ))}
        </div>

        <div className="buttonGroup">
          <button onClick={() => navigate(-1)} className="retakeBtn">
            Retake Interview
          </button>
          <button onClick={() => navigate("/dashboard")} className="backBtn">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;