import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../assets/logo.webp'; // Adjust the path based on your file structure


const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://x-found-backend.onrender.com/api/auth/login",
        formData
      );

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data._id,
        username: response.data.username,
        email: response.data.email
      }));

      // Log success and navigate
      console.log("Login successful:", response.data);
      alert(response.data.message);

      // Navigate to dashboard
      navigate("/"); // Assuming "/" is your Home component
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "Something went wrong");
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button">
            Login in
            {/* navigate(/login) */}
          </button>
        </form>
        <p>
          <Link to="/forgot-password">ForgotPassword ? <br/></Link>
          don't have an account ? <Link to="/SignupForm">signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
