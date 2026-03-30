import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    if (email !== storedUser.email) {
      setError("Email not registered.");
      return;
    }

    if (password !== storedUser.password) {
      setError("Incorrect password.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>InterviewMirror</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#4e73df", cursor: "pointer", fontWeight: "bold" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;