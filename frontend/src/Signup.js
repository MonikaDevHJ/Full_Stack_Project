import { Link } from "react-router-dom";
import Validation from "./Signupvalidation";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const [error, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value // Corrected here
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    console.log("Validation errors after submit:", validationErrors);

    if (validationErrors.name === "" && validationErrors.email === "" && validationErrors.password === "") {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Sign -Up</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong> Name </strong>{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                className="form-control rounded-0"
                onChange={handleInput}
              />
              {error.name && <span className="text-danger">{error.name}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong> Email </strong>{" "}
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                className="form-control rounded-0"
                onChange={handleInput}
              />
              {error.email && (
                <span className="text-danger">{error.email}</span>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>{" "}
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                className="form-control rounded-0"
                onChange={handleInput}
              />
              {error.password && (
                <span className="text-danger">{error.password}</span>
              )}
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
            <p>You are agreeing to our terms and conditions</p>
            <Link
              to="./"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
