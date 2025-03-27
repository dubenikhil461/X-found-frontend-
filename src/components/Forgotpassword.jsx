import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./forgot.css"; // Reusing your existing styles

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://x-found-backend.onrender.com/api/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <Link to="/">
          <img src="src/assets/logo.webp" alt="logo" className="logo1" />
        </Link>
      </div>
      <div className="card">
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a password reset link</p>

        {message && (
          <div className="success-message">
            {message} <Link to="/LoginForm">Back to Login</Link>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p>
          Remember your password? <Link to="/LoginForm">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
