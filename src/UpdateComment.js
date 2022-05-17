import React, { useState } from "react";
import axios from "axios";
const UpdateComment = ({
  editId,
  closeModel,
  setAddComment,
  getPostComments,
}) => {
  const [upDateComment, setUpDateComment] = useState("");
  const token = JSON.parse(localStorage.getItem("Token"));
  const UpdateComent = async () => {
    setUpDateComment();
    const coment = {
      comment: upDateComment,
    };

    const response = await axios.put(
      `https://taskforum.herokuapp.com/api/comment/${editId}`,
      coment,

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
  return (
    <div>
      <input
        type="text"
        value={upDateComment}
        onChange={(e) => setUpDateComment(e.target.value)}
      />
      <button
        className="btn btn-info ms-5"
        onClick={() => {
          UpdateComent();
          closeModel();
        }}
      >
        update
      </button>
    </div>
  );
};

export default UpdateComment;
