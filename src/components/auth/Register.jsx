import { use, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";


const Register = () => {
  const [fullname, setFullName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const navigate= useNavigate()

  const registerUser = async (event)=>{
    event.preventDefault();

    let userData = {
      fullname : fullname,
      email : email,
      password : password
    }
    console.log(userData);
    try {
     const response = await axios.post("http://localhost:3000/register", userData)
    alert("Register Successfully")
    navigate("/login")
      
    } catch (error) {
      alert("something went wrong")
      console.log(error.message);
      console.log(error.response?.data);     
    }
  }

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <div className="login-box">
        <h1>
          Aroma<span>Luxe</span>
        </h1>

        <h2>Create Account</h2>

        <p>Create your AromaLuxe account.</p>
                                      
        <form onSubmit = {registerUser}> 
          <input type="text" placeholder="Full Name" required value={fullname} onChange={(e)=>setFullName(e.target.value)} />
          <input type="email" placeholder="Email Address" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          

          <button type="submit">Register</button>
        </form>

        <div className="bottom-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;