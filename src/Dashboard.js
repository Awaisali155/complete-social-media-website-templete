import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsMessenger } from "react-icons/bs";
import { MdCircleNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { Button } from "react-bootstrap";
import "./App.css";
import { Modal } from "react-bootstrap";
import CreatePost from "./CreatePost";
import UpGradePost from "./UpGradePost";
import AllComments from "./AllComments";
const Dashboard = () => {
  ///////////////for create post
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ///////////////for update post
  const [newShow, setNewShow] = useState(false);
  const closeModel = () => setNewShow(false);
  const openModel = () => setNewShow(true);
  /////////////////////////////////////these are token ,id ,and main variable that recive data
  const [dashBord, setdashBoard] = useState([]);
  const token = JSON.parse(localStorage.getItem("Token"));
  const userId = JSON.parse(localStorage.getItem("id"));
  /////////////////////////
  const [sendID, setSendId] = useState("");
  function getId(itemId) {
    setSendId(itemId);
  }
  //////////////////////////// delete post
  function DeletePost(id) {
    axios
      .delete(`https://taskforum.herokuapp.com/api/post/${id}`, {
        headers: { Authorization: `Bearar ${token}` },
      })

      .then(function (res) {});
    getAllPost();
  }
  //////////////////////////get all post
  function getAllPost() {
    axios
      .get("https://taskforum.herokuapp.com/api/post/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setdashBoard(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            we-inform
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active ms-5"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active ms-5"
                  aria-current="page"
                  href="#"
                >
                  About us
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control w-100  "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <span>
                <BsSearch style={{ fontSize: "30px", margin: "10px" }} />
              </span>
              <span>
                <BsMessenger style={{ fontSize: "30px", margin: "10px" }} />
              </span>
              <span>
                <MdCircleNotifications
                  style={{ fontSize: "30px", margin: "10px" }}
                />
              </span>

              <div className="dropdown Right-aligned dropstart">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdAccountCircle />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li className="dropdown-item">
                    <Link to="/user">profile</Link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Setting
                    </a>
                  </li>

                  <li className="dropdown-item">
                    <Link to="/">
                      <button
                        className="btn ms-0"
                        onClick={() => {
                          window.localStorage.removeItem("Token");
                          window.localStorage.removeItem("id");
                          window.location.href = "/";
                        }}
                      >
                        logout
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <div className=" container mt-3 ">
        <button className="btn btn-info" onClick={handleShow}>
          Create post{" "}
        </button>
      </div>
      <h2 style={{ textAlign: "center" }}>posts</h2>
      <div className="container d-flex flex-wrap">
        {dashBord.map((ele) => {
          return (
            <div className="card w-35% ms-5 mb-3 border-3">
              <div className="card-body">
                <h5 className="card-title">{ele.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.category}</h6>
                <p className="card-text">{ele.description}</p>
                {userId == ele.user._id ? (
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      openModel();
                      getId(ele._id);
                    }}
                  >
                    update post
                  </button>
                ) : (
                  ""
                )}
                {userId == ele.user._id ? (
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => {
                      DeletePost(ele._id);
                    }}
                  >
                    Delete post
                  </button>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <AllComments
                dashBord={dashBord}
                postId={ele._id}
                getAllPost={getAllPost}
                postOwnerId={ele.user._id}
              />
            </div>
          );
        })}
      </div>

      {/* //////////////////////////
       */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>create post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CreatePost
            getAllPost={getAllPost}
            handleClose={handleClose}
            Dashboard={dashBord}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ///////////////////////////////// */}
      <Modal show={newShow} onHide={closeModel}>
        <Modal.Header>
          <Modal.Title>create post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UpGradePost
            Dashboard={dashBord}
            sendID={sendID}
            getAllPost={getAllPost}
            closeModel={closeModel}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ////////////// */}
    </>
  );
};

export default Dashboard;
