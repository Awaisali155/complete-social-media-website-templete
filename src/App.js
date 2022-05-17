import "./App.css";
import Signup from "./Signup";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Redirect,
} from "react-router-dom";
import {} from "react-router-dom";
import User from "./User";
function App() {
  const [token, setToken] = useState(localStorage.getItem("Token"));

  return (
    <>
      {/* {!token ? ( */}
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route
            path="/Signup"
            element={token ? <Dashboard /> : <Signup />}
          ></Route>
        </Routes>
        {/* </BrowserRouter> */}
        {/* // ) : ( */}
        {/* <BrowserRouter> */}
        <Routes>
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Home />}
          ></Route>
          <Route
            path="/sdashboard"
            element={<Dashboard />}
          ></Route>
          <Route path="/User" element={token ? <User /> : <Home />}></Route>
        </Routes>
      </BrowserRouter>
      {/* )} */}
    </>
  );
}

export default App;
