import React from "react";
import "./chat.style.scss";

const ChatInfo = ({ room, users }) => {
  return (
    <div className='chat-info'>
      <h1>
        <i className='fas fa-comments'></i> Room Name:
      </h1>
      <h1 className='room'>{room}</h1>
      <h2>
        <i className='fas fa-users'></i> Users
      </h2>
      <div className='users'>
        {users &&
          users.map(
            ({ userFront }) =>
              userFront && (
                <div key={userFront._id} className='user'>
                  <div className='user-info'>
                    <div className='user-img'>
                      <img src={userFront.picture} alt='pic' />
                    </div>
                    <span>{userFront.username}</span>
                  </div>
                  <div className='active'></div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default ChatInfo;
