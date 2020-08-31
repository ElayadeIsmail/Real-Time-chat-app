import React from "react";
import "./chat.style.scss";
const ChatInput = ({ sendMessage, setMessage, message }) => {
  return (
    <form onSubmit={(e) => sendMessage(e)} className='chat-input'>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type='text'
        placeholder='Type a message'
      />
      <button type='submit'>Send</button>
    </form>
  );
};

export default ChatInput;
