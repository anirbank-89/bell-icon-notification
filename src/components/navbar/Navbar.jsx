import React, { useEffect, useState } from "react";

// assets
import Notification from "../../img/bell-icons-16616.png";
import Message from "../../img/message-icon-png-14919.png";
import Settings from "../../img/hard-hat-icon-21019.png";

import "./styles.css";

const Navbar = ({ socket }) => {
  const [notifications, setnotifications] = useState([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setnotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  const displayNotifications = ({ senderName, type }, index) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span
        className="notification"
        key={index}
      >{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = (event) => {
    event.preventDefault();
    setnotifications([]);
    setopen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">My App</span>
      <div className="icons">
        <div className="icon" onClick={() => setopen((prev) => !prev)}>
          <img src={Notification} alt="bell_icon" className="iconImg" />
          {notifications.length > 0 ? (
            <div className="counter">{notifications.length}</div>
          ) : null}
        </div>
        <div className="icon" onClick={() => setopen((prev) => !prev)}>
          <img src={Message} alt="msg_icon" className="iconImg" />
          {/* <div className="counter">2</div> */}
        </div>
        <div className="icon" onClick={() => setopen((prev) => !prev)}>
          <img src={Settings} alt="settings_icon" className="iconImg" />
          {/* <div className="counter">2</div> */}
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, i) => displayNotifications(n, i))}
          <button className="notification_btn" onClick={handleRead}>
            Mark As Read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
