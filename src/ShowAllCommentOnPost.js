import React from "react";

const ShowAllCommentOnPost = ({ postComments }) => {
  return (
    <div>
      {postComments.map((elem, index) => {
        return (
          <>
            <p>
              {index + 1}:{"  "}
              {elem.comment}
            </p>
          </>
        );
      })}
    </div>
  );
};

export default ShowAllCommentOnPost;
