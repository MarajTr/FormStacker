import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const Login = (res) => {
  const [values, setValues]=useState({
    email:'',
    password:''
  })
  const navigate= useNavigate()
  const handleChange=(change)=>{
    setValues({...values, [change.target.name]:change.target.value})
  }
  const handleSubmit= async(change)=>{
    change.preventDefault()
    try{
      const response = await axios.post('https://formstacker-restapi.onrender.com/login', values)  //somechange on future
      if(response.status ==200){
          localStorage.setItem('token',response.data.token)
          navigate('/')
      }
    }
    catch(err)
    {
      console.error("Error in /register route:", err);
    return res.status(500).json({ error: err.message });
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
           {/* Email */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input type="email" className="form-control" placeholder="Email Address" required 
              name="email"  onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input type="password" className="form-control" placeholder="Password" required 
              name="password"  onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-100">Submit</button>

          {/* Already have an account */}
          <p className="mt-3 text-center">
            Don't  have an account? <Link to='/register' className="text-primary-500">Sign Up</Link> 
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;