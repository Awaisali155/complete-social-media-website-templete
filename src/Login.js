import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import User from "./User";
import "./App.css";
const Login = () => {
  const [loginUserEmail, setloginUserEmail] = useState("");
  const [loginUserPasword, setloginUserPasword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {}, [token]);

  // submit  function.................
  const handelChange = (e) => {
    e.preventDefault();
    const newUser = {
      email: loginUserEmail,
      password: loginUserPasword,
    };

    axios
      .post("https://taskforum.herokuapp.com/api/auth/signin", newUser)
      .then(function (response) {
        localStorage.setItem("Token", JSON.stringify(response.data.token));
        localStorage.setItem("id", JSON.stringify(response.data.id));
        setToken(response.data.token);

        setData(response.data);
        window.location.href = "/dashboard";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="container mt-5 form">
        <h1 className="heading">Login</h1>
        <div className="mt-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control w-75"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={loginUserEmail}
            v
            onChange={(e) => setloginUserEmail(e.target.value)}
          />
          <div
            id="emailHelp"
            className="form-text "
            style={{ color: "whitesmoke" }}
          >
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control  w-75"
            z
            id="exampleInputPassword1"
            value={loginUserPasword}
            onChange={(e) => setloginUserPasword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handelChange(e)}
        >
          Submit
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/Signup" className="text" style={{ color: "black" }}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
