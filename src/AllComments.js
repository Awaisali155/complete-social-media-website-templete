import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import UpdateComment from "./UpdateComment";
import ShowAllCommentOnPosht from "./ShowAllCommentOnPost";
const AllComments = ({ dashBord, postId, getAllPost, postOwnerId }) => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const [postComments, setPostComments] = useState([]);
  const [addComment, setAddComment] = useState("");
  const userId = JSON.parse(localStorage.getItem("id"));
  const [editId, setEditId] = useState("");
  const [showMore, setShowMore] = useState(3);
  //  const token = JSON.parse(localStorage.getItem("Token"));
  const [newShow, setNewShow] = useState(false);
  const closeModel = () => setNewShow(false);
  const openModel = () => setNewShow(true);
  ////////////////comment show modal
  const [commentShow, setCommentShow] = useState(false);
  const commentCloseModel = () => setCommentShow(false);
  const commentOpenModel = () => setCommentShow(true);
  ///////////////
  useEffect(() => {
    getPostComments();
  }, []);

  // Get all Comments of one post
  const getPostComments = async () => {
    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/comment/post/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setPostComments(response.data.data);
    }
  };
  /////////////////add comments
  const commentAdd = async () => {
    const commentData = {
      user: userId,
      comment: addComment,
      post: postId,
    };
    const response = await axios.post(
      "https://taskforum.herokuapp.com/api/comment/",
      commentData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAddComment("");
    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      getPostComments();
    }
  };
  //////////////////////delete comment
  const deleteComment = async (id) => {
    const response = await axios.delete(
      `https://taskforum.herokuapp.com/api/comment/${id}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      getPostComments();
      setAddComment();
    }
  };
  function fun(id) {
    setEditId(id);
  }

  return (
    <div>
      <h5>comments</h5>
      {postComments
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, showMore)
        .map((cmnt, index) => {
          return (
            <>
              <div className="border">
                <p>
                  {index + 1}: {cmnt.comment}
                  {cmnt.user._id == userId ? (
                    <div className="mt-3">
                      <button
                        className="ms-2 btn"
                        onClick={() => {
                          openModel();
                          fun(cmnt._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="ms-3 btn "
                        onClick={() => deleteComment(cmnt._id)}
                      >
                        Delete
                      </button>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </>
          );
        })}
      <input
        type="text"
        value={addComment}
        onChange={(e) => setAddComment(e.target.value)}
      />
      <button
        className="btn btn-info ms-3"
        onClick={() => {
          commentAdd();
          postComments();
        }}
      >
        Add
      </button>
      <button
        className="btn btn-info ms-3"
        onClick={() => {
          // ShowComments();
          commentOpenModel();
        }}
      >
        Show more
      </button>
      <Modal show={newShow} onHide={closeModel}>
        <Modal.Header>
          <Modal.Title>update comment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UpdateComment
            editId={editId}
            closeModel={closeModel}
            setAddComment={setAddComment}
            getPostComments={getPostComments}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ////////////////////////////////?show comment modal */}
      <Modal show={commentShow} onHide={commentCloseModel}>
        <Modal.Header>
          <Modal.Title>All comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowAllCommentOnPosht postComments={postComments} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={commentCloseModel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllComments;
