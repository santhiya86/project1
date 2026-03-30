import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>InterviewMirror</h2>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>

        <p onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
          Don't have an account? Sign Up
        </p>
      </div>
    </div>
  );
}

export default Login;