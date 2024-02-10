import { useState, useEffect } from "react";
import { posts } from "./data";
import { io } from "socket.io-client";

// Components
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";

import './App.css';

const socket = io("http://localhost:5000");

function App() {
  const [username, setusername] = useState("");
  const [user, setuser] = useState("");

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    socket.emit("addNewUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {localStorage.getItem("user") ? (
        <>
          <Navbar socket={socket} />
          {
            posts.map((post) => (<Card key={post.id} post={post} socket={socket} user={user} />))
          }
          <span className="username">{localStorage.getItem("user")}</span>
        </>) : (
        <div className='login'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <button onClick={() => {
            setuser(username);
            localStorage.setItem("user", username);
          }}>Login</button>
        </div>)}
    </div>
  );
}

export default App;
