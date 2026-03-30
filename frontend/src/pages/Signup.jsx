import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 8) newErrors.password = "Min 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.role) newErrors.role = "Select role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          formData
        );

        alert("Signup Successful!");
        navigate("/");
      } catch (err) {
        alert("Signup failed!");
        console.error(err);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>InterviewMirror</h2>
        <h3>Create Your Account</h3>

        <form onSubmit={handleSignup}>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <input name="email" placeholder="Email" onChange={handleChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}

          <select name="role" onChange={handleChange}>
            <option value="">Select Role</option>
            <option>Student</option>
            <option>Fresher</option>
            <option>Experienced</option>
          </select>
          {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;