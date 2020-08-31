import React from "react";
import "./chat.style.scss";
import { connect } from "react-redux";
import ReactEmoji from "react-emoji";

const Message = ({ auth: { user }, message }) => {
  return (
    <>
      {message.user === "admin" ? (
        <div className='admin'>
          <p>{message.text}</p>
        </div>
      ) : message.user._id === user._id ? (
        <div className='message-user'>
          <div className='message-text-user'>
            <span className='arrow'></span>
            <span>{message.user.username}</span>
            <p>{ReactEmoji.emojify(message.text)}</p>
          </div>
          <div className='msg-img-user'>
            <img src={message.user.picture} alt='pic' />
          </div>
        </div>
      ) : (
        <div className='message'>
          <div className='msg-img'>
            <img src={message.user.picture} alt='pic' />
          </div>
          <div className='message-text'>
            <span className='arrow'></span>
            <span>{message.user.username}</span>
            <p>{ReactEmoji.emojify(message.text)}</p>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Message);
