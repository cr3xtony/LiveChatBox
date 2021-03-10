import React from 'react';

import '../css/SingleMessage.css';

const SingleMessage = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  if (user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer">
      <p className="sentText pr-10">{name}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default SingleMessage;
