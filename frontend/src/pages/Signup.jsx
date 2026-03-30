import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Must contain at least one number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (validate()) {
      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify({
        email: formData.email,
        password: formData.password
      }));

      alert("Signup Successful!");
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>InterviewMirror</h2>
        <h3>Create Your Account</h3>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Your Role</option>
            <option value="Student">Student</option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
          {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} className="login-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;