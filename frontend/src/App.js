import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';

function App() {
  return (
    <Router forceRefresh={true}>
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route
        path="/chatroom/:id"
        render={(props) => <ChatScreen {...props} />}
      />

      <Route path="/" component={HomeScreen} exact />
    </Router>
  );
}

export default App;
