import axios from "axios";
import React from "react";
import { useState } from "react";

const CreatePost = ({ getAllPost, handleClose, Dashboard }) => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const [updateTitle, setupdateTitle] = useState("");
  const [updateDescription, setupdateDescription] = useState("");
  const [updateCategory, setupdateCategory] = useState("");
  function CreateNewPost() {
    const userId = JSON.parse(localStorage.getItem("id"));
    const updatePost = {
      user: userId,
      title: updateTitle,
      description: updateDescription,
      category: updateCategory,
    };
    axios
      .post("https://taskforum.herokuapp.com/api/post/", updatePost, {
        headers: { Authorization: `Bearar ${token}` },
      })

      .then(function (res) {
        getAllPost();
      });
  }
  return (
    <div>
      <div>
        <label htmlFor="">Title</label>
        <div>
          {" "}
          <input
            type="text"
            value={updateTitle}
            onChange={(e) => setupdateTitle(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">Description</label>
        <div>
          {" "}
          <input
            type="text"
            value={updateDescription}
            onChange={(e) => setupdateDescription(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">Category</label>
        <div>
          {" "}
          <input
            type="text"
            value={updateCategory}
            onChange={(e) => setupdateCategory(e.target.value)}
          />
        </div>
      </div>
      <button
        className="btn btn-info mt-5"
        onClick={() => {
          CreateNewPost();
          handleClose();
        }}
      >
        create
      </button>
    </div>
  );
};

export default CreatePost;
