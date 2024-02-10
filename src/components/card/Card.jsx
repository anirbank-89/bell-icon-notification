import React, { useState } from "react";

// assets
import HeartWhite from "../../img/heart-icon-3351.png";
import HeartRed from "../../img/heart-icon-3335.png";
import Comment from "../../img/comment-png-22705.png";
import Share from "../../img/shareit-icon-40109.png";
import Info from "../../img/information-icon-6061.png";

import "./styles.css";

const Card = ({ post, socket, user }) => {
  console.log("post",post);
  const [liked, setliked] = useState(false);

  const handleLike = (type) => {
    setliked((prevState) => !prevState);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  const handleComment = (event) => {
    event.preventDefault();
  };

  const handleShare = (type) => {
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post?.userImg} alt="user_image" className="userImg" />
        <span>{post?.fullname}</span>
      </div>
      <img src={post?.postImg} alt="" className="postImg" />
      <div className="interaction">
        <img
          src={liked ? HeartRed : HeartWhite}
          alt="like"
          className="cardIcon"
          onClick={() => handleLike(1)}
        />
        <img
          src={Comment}
          alt="comment"
          className="cardIcon"
          onClick={(e) => handleComment(e)}
        />
        <img
          src={Share}
          alt="share"
          className="cardIcon"
          onClick={() => handleShare(3)}
        />
        <img src={Info} alt="info" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
