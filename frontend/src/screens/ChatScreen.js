import React from 'react';
import io from 'socket.io-client';

const ChatScreen = ({ match }) => {
  const chatRoomId = match.params.id;
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const user_id = user._id;
  const socket = io('http://localhost:5000', {
    withCredentials: true,
  });
  return <div>ChatRoom page</div>;
};

export default ChatScreen;
