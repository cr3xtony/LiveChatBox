import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   Container,
//   Form,
//   FormControl,
//   InputGroup,
// } from 'react-bootstrap';
import io from 'socket.io-client';
// import FormContainer from '../components/FormContainer';
let socket;
const ChatScreen = ({ match }) => {
  const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const user_id = user._id;
  const chatRoomId = match.params.id;
  const endPoint = 'http://localhost:5000';

  useEffect(() => {
    socket = io(endPoint, {
      query: {
        userId: user_id,
      },
    });
    setRoomId(chatRoomId);

    socket.emit('join', { roomId }, () => {});

    // return () => {
    //   socket.emit('disconnect');
    //   socket.off();
    // };
  }, [chatRoomId, roomId]);

  useEffect(() => {
    socket = io(endPoint);
    console.log({ socket });
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages, message, socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  console.log(message, messages);
  socket.on('message', (message) => {
    console.log(message);
  });

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   socket.emit('chatMessage', {
  //     chatRoomId,
  //     newMessage,
  //   });
  // };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('newMessage', (message) => {
  //       console.log(message);
  //       const newMessages = [...messages, message];
  //       console.log(newMessage);
  //       setMessages(newMessages);
  //     });
  //   }
  // });

  return (
    <>
      {/* <div class="chat-container">
        <header class="chat-header">
          <h1>
            <i class="fas fa-smile"></i> ChatCord
          </h1>
          <Button class="btn">Leave Room</Button>
        </header>
        <main class="chat-main">
          <div class="chat-sidebar">
            <h3>
              <i class="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name">JavaScript</h2>
            <h3>
              <i class="fas fa-users"></i> Users
            </h3>
            <ul id="users">
              <li>Brad</li>
            </ul>
          </div>
          {messages.map((message, i) => (
            <div key={i} class="chat-messages">
              <div class="message">
                <p class="meta">{message.name}</p>
                <p class="text">{message.message}</p>
              </div>
            </div>
          ))}
        </main>
        <div class="chat-form-container">
          <Form id="chat-form" onSubmit={submitHandler}>
            <InputGroup className="mb-3">
              <FormControl onChange={(e) => setNewMessage(e.target.value)} />
              <InputGroup.Append>
                <Button type="submit">Button</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      </div> */}
      <div className="outerContainer">
        <div className="container">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
          />
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
