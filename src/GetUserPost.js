import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserActivty from "./UserActivty";
import UserCommentActivty from "./UserCommentActivty";
const GetUserPost = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const id = JSON.parse(localStorage.getItem("id"));
  const [post, setPost] = useState([]);
  const [showPostId, setShowPostId] = useState("");
  const [cmntID, setCmntID] = useState();
  ////////////////////modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //////////////////////////////////////////
  const [cmntShow, setCmntShow] = useState(false);
  const close = () => setCmntShow(false);
  const open = () => setCmntShow(true);
  const [commentActivty, setCommentActivty] = useState([]);
  const userComment = () => {
    axios
      .get(`https://taskforum.herokuapp.com/api/comment/user/${id}`, {
        headers: { Authorization: `Bearar ${token}` },
      })
      .then(function (res) {
        setCommentActivty(res.data.data);
      });
  };
  /////////////////////// user user Activity
  useEffect(() => {
    axios
      .get(`https://taskforum.herokuapp.com/api/post/user/${id}`, {
        headers: { Authorization: `Bearar ${token}` },
      })
      .then(function (res) {
        setPost(res.data.data);
      });
    userComment();
  }, []);
  function userCommentActivty(id) {
    setCmntID(id);
  }
  return (
    <>
      <h1 className="mt-2 text-center">your Activty here</h1>
      <p className="text-center">your post here</p>
      <div className="container d-flex flex-wrap mt-5">
        {post.map((ele, index) => {
          {
          }
          return (
            <div class="card ms-3" onClick={handleShow}>
              <div
                class="card-body"
                onClick={() => {
                  setShowPostId(ele._id);
                }}
              >
                <h5 class="card-title">{ele.title}</h5>
                <h2 class="card-title">{ele.category}</h2>
                <p class="card-text">{ele.description}</p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div>
        <hr />
        <h4 className="text-center mb-4">your comment activty on following post</h4>
<p>click on the post for check more details</p>
        <div className="d-flex gap-5">
          {commentActivty.map((ele) => {
            return (
              <>
                {
                  <>
                    <div
                      className=" card"
                      style={{ width: "200px" }}
                      onClick={() => {
                        userCommentActivty(ele._id);
                        open();
                      }}
                    >
                      <h6 className="card-title">
                        Post Title:
                        {ele.post.title}
                      </h6>
                    </div>
                  </>
                }
              </>
            );
          })}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>your activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserActivty post={post} showPostId={showPostId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cencel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ///////////////////////////// */}
      <Modal show={cmntShow} onHide={close}>
        <Modal.Header>
          <Modal.Title>your post on you comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserCommentActivty commentActivty={commentActivty} cmntID={cmntID} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            cencel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GetUserPost;
