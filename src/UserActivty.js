import React, { useEffect, useState } from "react";
import axios from "axios";
const UserActivty = ({ post, showPostId }) => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const id = JSON.parse(localStorage.getItem("id"));
  const [comments, setComments] = useState([]);
  const getPostComments = async () => {
    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/comment/post/${showPostId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setComments(response.data.data);
    }
  };
 
  useEffect(() => {
    getPostComments();
   
  }, []);

  return (
    <div>
      <div className="container d-flex flex-wrap mt-5">
        {post.map((ele) => {
          return (
            <>
              {showPostId == ele._id ? (
                <div class="card ms-3">
                  <div class="card-body">
                    <h5 class="card-title">{ele.title}</h5>
                    <h2 class="card-title">{ele.category}</h2>
                    <p class="card-text">{ele.description}</p>
                    <button className="btn">Update</button>
                  </div>
                  <hr />
                  <h6 className="ms-3"> yourComments</h6>
                  {comments.map((ele, index) => {
                    return (
                      <>
                        {ele.post == showPostId ? (
                          <h5>
                            {index + 1}:){ele.comment}
                          </h5>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </>

          );
        })}
      </div>
    </div>
  );
};

export default UserActivty;
