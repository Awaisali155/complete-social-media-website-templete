import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link,useNavigate } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand ms-5">We-inform</a>
        </nav>
      </div>
      <Login />
    </>
  );
};

export default Home;
