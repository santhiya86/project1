import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";       

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const subjects = ["OOPS", "CN", "DBMS", "OS", "WebDev", "DSA"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleStartInterview = () => {
    if (!selectedType) return alert("Select interview type!");
    if (selectedType === "Technical" && (!selectedSubject || !selectedDifficulty))
      return alert("Select subject and difficulty!");
    
    navigate("/interview", {
      state: { type: selectedType, subject: selectedSubject, difficulty: selectedDifficulty },
    });
  };

  const renderButtons = (items, selected, setSelected) => (
    <div className="buttonGroup">
      {items.map((item) => (
        <button
          key={item}
          className={`typeBtn ${selected === item ? "active" : ""}`}
          onClick={() => setSelected(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="dashboardContainer">
      <div className="dashboardCard">
        <h2 className="title">InterviewMirror</h2>
        <p className="subtitle">AI-Powered Mock Interview Platform</p>

        <h3>Select Interview Type</h3>
        {renderButtons(["Technical", "HR", "Behavioral"], selectedType, setSelectedType)}

        {selectedType === "Technical" && (
          <>
            <h3>Select Subject</h3>
            {renderButtons(subjects, selectedSubject, setSelectedSubject)}

            <h3>Select Difficulty</h3>
            {renderButtons(difficulties, selectedDifficulty, setSelectedDifficulty)}
          </>
        )}

        <button className="startBtn" onClick={handleStartInterview}>
          Start {selectedType} Interview
        </button>

        {/* Removed View My Results button as requested */}
      </div>
    </div>
  );
};

export default Dashboard;