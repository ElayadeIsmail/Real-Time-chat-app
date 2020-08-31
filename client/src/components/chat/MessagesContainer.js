import React from "react";
import "./chat.style.scss";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const MessagesContainer = ({ messages }) => {
  return (
    <ScrollToBottom className='messages-container'>
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </ScrollToBottom>
  );
};

export default MessagesContainer;
