import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const loginUser = async (event) => {

    event.preventDefault();

    let loginData = {
      email: email,
      password: password,
    };

    console.log(loginData);

    try {
      const response = await axios.post("http://localhost:3000/login", loginData);
      alert(response.data.message);
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message);
      console.log(error.message);
      console.log(error.response?.data);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <div className="login-box">
        <h1>
          Aroma<span>Luxe</span>
        </h1>

        <h2>Welcome Back</h2>

        <p>Login to continue shopping.</p>

        <form onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="bottom-text">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="bottom-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;