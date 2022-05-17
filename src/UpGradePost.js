import React, { useState } from "react";
import axios from "axios";
const UpGradePost = ({ Dashboard, sendID, getAllPost, closeModel }) => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const [updateTitle, setUpdateTitle] = useState("");
  const id = sendID;
  function gun() {
    const changeTitle = { title: updateTitle };
    axios
      .put(
        `https://taskforum.herokuapp.com/api/post/${id}`,
        changeTitle,

        { headers: { Authorization: `Bearar ${token}` } }
      )

      .then(function (res) {
        getAllPost();
      });
  }

  return (
    <div>
      <div>
        <label htmlFor="">Update Title</label>
      </div>
      <div>
        <input
          type="text"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
        />
      </div>
      <button
        className="btn btn-info mt-4"
        onClick={() => {
          gun();
          closeModel();
          getAllPost();
        }}
      >
        update
      </button>
    </div>
  );
};

export default UpGradePost;
