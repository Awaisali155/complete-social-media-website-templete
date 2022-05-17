import React from "react";
import { getValue } from "@testing-library/user-event/dist/utils";
// import Modal from "react-modal";
import axios from "axios";
import { useState } from "react";
const Edituser = ({ handleClose, userProfile, fetch, setuserProfile }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("Token")));
  const id = JSON.parse(localStorage.getItem("id"));

  const [updateName, setUpdateName] = useState(userProfile.name);

  function update() {
    const user = { name: updateName };
    axios
      .put(
        `https://taskforum.herokuapp.com/api/users/${id}`,
        user,

        { headers: { Authorization: `Bearar ${token}` } }
      )

      .then(function (res) {
        fetch();
      });

    setUpdateName("");
  }

  return (
    <div>
      <div>
        <label htmlFor="">Name</label>
      </div>
      <div>
        <input
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          type="text"
        />
      </div>
      <div className="mt-2">
        <button
          onClick={() => {
            update();
            handleClose();
          }}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default Edituser;
