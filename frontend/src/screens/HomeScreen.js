import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
const HomeScreen = ({ history }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (!user) {
    history.push('/login');
  }
  async function getChatRoomNames() {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    let { data } = await axios.get('/api/chatrooms', config);
    setGetName(data);
  }
  const [name, setName] = useState('');
  const [getName, setGetName] = useState('');

  const submitCreateChatRoom = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('/api/chatrooms', { name }, config);
      getChatRoomNames();
      toast.success('Created Chatroom Successfully', { autoClose: 1500 });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(err, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    getChatRoomNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/login');
  };
  return user ? (
    <FormContainer>
      <h1>Welcome {user.name}</h1>
      <Button
        onClick={logoutHandler}
        style={{
          background: 'Crimson',
          padding: '10px 20px',
          margin: '10px 0px',
        }}
      >
        Logout
      </Button>
      <Form onSubmit={submitCreateChatRoom}>
        <Form.Group controlId="chatroom">
          <Form.Label>Create Chatroom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Chat Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Create Chat Room
        </Button>
        <ToastContainer />
      </Form>

      <h1 style={{ marginTop: '20px' }}>Enter Chatroom</h1>
      {getName ? (
        getName.map((name) => (
          <Link key={name._id} to={`/chatroom/${name._id}/`}>
            <Button
              variant="light"
              className="btn-sm"
              style={{
                display: 'block',
                padding: '10px',
                paddingRight: '20px',
                paddingLeft: '20px',
                marginTop: '20px',
                backgroundColor: 'Orchid',
                color: 'white',
              }}
            >
              {name.name}
            </Button>
          </Link>
        ))
      ) : (
        <Loader />
      )}
    </FormContainer>
  ) : (
    <Loader />
  );
};

export default HomeScreen;
