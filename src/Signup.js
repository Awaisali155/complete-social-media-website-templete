import React, { useState } from "react";
import "./App.css";
import { Link, useNavigationType } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
const Navigate=useNavigationType()
  // function from signup........................
  const SignupFun = () => {
    const upUser = {
      name: name,
      email: email,
      password: password,
    };
  
    axios
      .post("https://taskforum.herokuapp.com/api/auth/signup", upUser)
      .then(function (response) {
        console.log(response, "from");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand ms-5" href="#">
          We-inform
        </a>
      </nav>
      <form className="container mt-5 form">
        <h1 className="heading">Signup </h1>
        <div className="mt-4">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control w-75"
            id="exampleInputName"
            aria-describedby="NameHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control w-75"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control  w-75"
            z
            id="exampleInputPassword1"
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
          className="btn btn-primary "
          onClick={() => SignupFun()}
        >
          <Link
            className="text"
            to="/sdashboard"
            style={{ color: "whitesmoke" }}
          >
            Ragister
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Signup;
