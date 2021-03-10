import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import InfoBar from '../components/InfoBar';
import Input from '../components/Input';
import Messages from '../components/Messages';
import '../css/Chat.css';

const ChatScreen = ({ match }) => {
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const user_id = user._id;
  const chatRoomId = match.params.id;
  const endPoint = 'http://localhost:5000';
  const socket = io(endPoint, {
    query: {
      userId: user_id,
    },
  });
  useEffect(() => {
    setRoomId(chatRoomId);

    socket.emit('join', { roomId }, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId, roomId]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, message]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar roomId={roomId} />
        <Messages messages={messages} name={user.name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatScreen;
