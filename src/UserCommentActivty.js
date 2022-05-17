import React from "react";

const UserCommentActivty = ({ commentActivty, cmntID }) => {
  return (
    <div>
      {commentActivty.map((ele,index) => {
        return (
          <>
            <div>
              <div>
                {ele._id == cmntID ? (
                  <div>
                                <div>Title:{ "  "}{ele.post.title}</div>
                                <div>Description:{ " "}{ele.post.description}</div>
                    <h6>your comments</h6>
                                <div>):{ "  "}{ele.comment}</div>
                    
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default UserCommentActivty;
