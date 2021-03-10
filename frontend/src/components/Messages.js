import React from 'react';
import SingleMessage from './SingleMessage';
import '../css/Messages.css';

const Messages = ({ messages, name }) => {
  return (
    <>
      {messages.map((message, i) => (
        <div key={i}>
          <SingleMessage message={message} name={name} />
        </div>
      ))}
    </>
  );
};

export default Messages;
