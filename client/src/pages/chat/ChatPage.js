import React, { useState, useEffect } from "react";
import Header from "../../components/chat/Header";
import ChatInfo from "../../components/chat/ChatInfo";
import MessagesContainer from "../../components/chat/MessagesContainer";
import ChatInput from "../../components/chat/ChatInput";
import "./chatpage.style.scss";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import CheckRoom from "../../utils/CheckRoom";

let socket;

const ChatPage = ({ auth: { user } }) => {
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://server-chatss.herokuapp.com/";
  const { room } = useParams();
  CheckRoom(room);
  useEffect(() => {
    socket = io(ENDPOINT);
    if (user) {
      const userFront = user;
      socket.emit("join", { userFront, room });
    }

    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, [ENDPOINT, user, room]);

  useEffect(() => {
    if (user) {
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }
  }, [user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <div className='chat-page'>
      <Header />
      <div className='content'>
        <ChatInfo room={room} users={users} />

        <MessagesContainer messages={messages} />
      </div>
      <ChatInput
        message={message}
        sendMessage={sendMessage}
        setMessage={setMessage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ChatPage);
