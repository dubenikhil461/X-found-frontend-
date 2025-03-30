import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from '../assets/logo.webp';
import "./signup.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://x-found-backend.onrender.com/api/auth/reset-password/${token}`,
        {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );
      setMessage(response.data.message);
      setTimeout(() => navigate("/LoginForm"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <Link to="/">
      <img src={logo} alt="logo" className="logo1" />
        </Link>
      </div>
      <div className="card">
        <h1>Reset Password</h1>

        {message && (
          <div className="success-message">
            {message} Redirecting to login...
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />

          <input
            className="input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
