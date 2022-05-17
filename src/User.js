import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Edituser from "./Edituser";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GetUserPost from "./GetUserPost";
const User = () => {
  const [userProfile, setuserProfie] = useState("");
  const token = JSON.parse(localStorage.getItem("Token"));
  const id = JSON.parse(localStorage.getItem("id"));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  async function fetch(reqBody) {
    try {
      let res = await Axios({
        method: "GET",
        url: `https://taskforum.herokuapp.com/api/users/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: reqBody,
      });
      let data = res.data;
      setuserProfie(data.data);
      return data;
    } catch (error) {
      console.log(error.response); // this is the main part. Use the response property from the error object

      return error.response;
    }
  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            We Inform
          </a>
          <Link to="/Dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
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
          <div
            className="collapse navbar-collapse"
            style={{ marginLeft: "700px" }}
            id="navbarSupportedContent"
          >
            {/* <form class="d-flex">
              {userProfile.map((ele) => {
                return (
                  <> */}
            <div className="card">
              <div className="card-header">
                <h3>welcome:{userProfile.name}</h3>
              </div>
              <div className="card-body">
                <h6 className="card-title">{userProfile.email}</h6>
              </div>
            </div>
            {/* </>
                );
              })}
            </form> */}
            <button className="btn btn-danger ms-5" onClick={handleShow}>
              Edit profile
            </button>
            {/* <button className="btn btn-danger ms-5" >
              Edit profile
            </button>
             */}
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update profile name</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Edituser
            handleClose={handleClose}
            userProfile={userProfile}
            setuserProfie={setuserProfie}
            fetch={fetch}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <GetUserPost />
    </>
  );
};

export default User;
