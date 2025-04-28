import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './view/Profile';
import Login from './view/Login';
import Register from './view/Register';

function App() {
  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
