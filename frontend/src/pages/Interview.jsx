import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Interview.css";

const Interview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safe navigation
  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  const { type, subject, difficulty } = state;

  // ===============================
  // QUESTIONS DATA
  // ===============================
  const questionsData = {
    Technical: {
      OOPS: {
        Easy: [
          { question: "What is OOPS?" },
          { question: "What is Encapsulation?" },
          { question: "What is Inheritance?" },
          { question: "What is Polymorphism?" },
          { question: "What is Abstraction?" }
        ],
        Medium: [
          { question: "Explain constructor in OOPS." },
          { question: "Difference between overloading and overriding?" },
          { question: "What is virtual function?" },
          { question: "What is multiple inheritance?" },
          { question: "What is dynamic binding?" }
        ],
        Hard: [
          { question: "Difference between abstract class and interface?" },
          { question: "Explain SOLID principles." },
          { question: "What is diamond problem?" },
          { question: "Explain dependency injection." },
          { question: "Explain design patterns." }
        ]
      },
      CN: {
        Easy: [
          { question: "What is Computer Network?" },
          { question: "What is IP Address?" },
          { question: "What is LAN and WAN?" },
          { question: "What is Router?" },
          { question: "What is MAC Address?" }
        ],
        Medium: [
          { question: "Explain OSI Model." },
          { question: "Difference between TCP and UDP?" },
          { question: "What is DNS?" },
          { question: "What is HTTP?" },
          { question: "What is Subnet Mask?" }
        ],
        Hard: [
          { question: "Explain Congestion Control." },
          { question: "What is Sliding Window Protocol?" },
          { question: "Explain ARP protocol." },
          { question: "What is Network Topology?" },
          { question: "Explain routing algorithms." }
        ]
      },
      DBMS: {
        Easy: [
          { question: "What is DBMS?" },
          { question: "What is Primary Key?" },
          { question: "What is Foreign Key?" },
          { question: "What is SQL?" },
          { question: "What is Table?" }
        ],
        Medium: [
          { question: "Explain Normalization." },
          { question: "What is Indexing?" },
          { question: "Difference between DELETE and TRUNCATE?" },
          { question: "What is ER Diagram?" },
          { question: "What is JOIN?" }
        ],
        Hard: [
          { question: "Explain ACID properties." },
          { question: "What is Transaction Management?" },
          { question: "What is Deadlock?" },
          { question: "Explain Two Phase Locking." },
          { question: "What is Distributed Database?" }
        ]
      },
      WebDev: {
        Easy: [
          { question: "What is HTML?" },
          { question: "What is CSS?" },
          { question: "What is JavaScript?" },
          { question: "What is DOM?" },
          { question: "What is Responsive Design?" }
        ],
        Medium: [
          { question: "What is REST API?" },
          { question: "Explain React lifecycle." },
          { question: "What is Node.js?" },
          { question: "What is Express.js?" },
          { question: "What is JSON?" }
        ],
        Hard: [
          { question: "What is JWT?" },
          { question: "Explain Authentication vs Authorization." },
          { question: "What is CORS?" },
          { question: "Explain Web Security." },
          { question: "What is Server Side Rendering?" }
        ]
      },
      DSA: {
        Easy: [
          { question: "What is Array?" },
          { question: "What is Stack?" },
          { question: "What is Queue?" },
          { question: "What is Linked List?" },
          { question: "What is Searching?" }
        ],
        Medium: [
          { question: "Explain Binary Search." },
          { question: "What is Recursion?" },
          { question: "What is Sorting?" },
          { question: "Explain Tree." },
          { question: "What is Hashing?" }
        ],
        Hard: [
          { question: "Explain Time Complexity." },
          { question: "What is Dynamic Programming?" },
          { question: "Explain Graph Traversal." },
          { question: "What is Greedy Algorithm?" },
          { question: "What is Backtracking?" }
        ]
      },
      OS: {
        Easy: [
          { question: "What is Operating System?" },
          { question: "What is Process?" },
          { question: "What is Thread?" },
          { question: "What is CPU Scheduling?" },
          { question: "What is Kernel?" }
        ],
        Medium: [
          { question: "Explain Deadlock." },
          { question: "What is Multithreading?" },
          { question: "Explain Paging." },
          { question: "What is Context Switching?" },
          { question: "What is Semaphore?" }
        ],
        Hard: [
          { question: "Explain Paging vs Segmentation." },
          { question: "What is Virtual Memory?" },
          { question: "Explain Banker’s Algorithm." },
          { question: "What is Thrashing?" },
          { question: "Explain Memory Management techniques." }
        ]
      }
    },

    HR: [
      { question: "Tell me about yourself." },
      { question: "Why should we hire you?" },
      { question: "What is your strength?" },
      { question: "What is your weakness?" },
      { question: "Where do you see yourself in 5 years?" }
    ],

    Behavioral: [
      { question: "Describe a challenge you faced." },
      { question: "Tell about teamwork experience." },
      { question: "Describe leadership situation." },
      { question: "How do you handle pressure?" },
      { question: "Tell about conflict resolution." }
    ]
  };

  // ===============================
  // SELECT QUESTIONS BASED ON TYPE
  // ===============================
  let questions = [];

  if (type === "Technical") {
    questions = questionsData[type]?.[subject]?.[difficulty] || [];
  } else {
    questions = questionsData[type] || [];
  }

  if (!questions.length)
    return <h2 style={{ textAlign: "center" }}>No Questions Available</h2>;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [startTime] = useState(Date.now());

  const handleAnswerChange = (e) => {
    const updated = [...answers];
    updated[currentIndex] = e.target.value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (!answers[currentIndex].trim()) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const endTime = Date.now();
      const totalTime = Math.floor((endTime - startTime) / 1000);

      localStorage.setItem(
        "lastResult",
        JSON.stringify({
          type,
          subject: type === "Technical" ? subject : null,
          difficulty: type === "Technical" ? difficulty : null,
          questions,
          answers,
          timeTaken: totalTime
        })
      );

      navigate("/result");
    }
  };

  return (
    <div className="interviewContainer">
      <div className="interviewCard">
        <h2>
          {type}{" "}
          {type === "Technical" ? `- ${subject} (${difficulty})` : ""}
        </h2>

        <div className="questionCard">
          <p>
            Q{currentIndex + 1} of {questions.length}
          </p>
          <p>{questions[currentIndex].question}</p>

          <textarea
            value={answers[currentIndex]}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
          />
        </div>

        <button
          className="nextBtn"
          onClick={handleNext}
          disabled={!answers[currentIndex].trim()}
        >
          {currentIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Interview;