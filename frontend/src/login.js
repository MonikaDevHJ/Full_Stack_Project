import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Validaton from "./Loginvalidation";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [error, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value // Changed to set value correctly
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validaton(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if(res.data==="success"){
            navigate('/home')
          }else{
            alert("No record existed");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign - In</h2>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password" // Corrected the type to "password"
              placeholder="Enter Your Password"
              name="password"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {error.password && <span className="text-danger">{error.password}</span>}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign In
          </button>
          <p>you are agreeing to our terms and conditions</p>
          <Link
            to="./Signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create an Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
