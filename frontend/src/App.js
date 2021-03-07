import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
function App() {
  return (
    <Router forceRefresh={true}>
      <Container className="container">
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/chatroom/:id" component={ChatScreen} exact />
        <Route path="/" component={HomeScreen} exact />
      </Container>
    </Router>
  );
}

export default App;
