import {BrowserRouter as Router, Routes, Route, Link} from 'react-router';
import Profile from './view/Profile';
import Login from './view/Login';
import Register from './view/Register';
import MenuPage from './view/MenuPage';
import './css/header.css';
import './App.css';
import Reservation from './view/Reservation';
import Frontpage from './view/Frontpage';

function App() {
  return (
    <Router>
      <header className="header">
        <div className="restaurant-name">
          <h1>Ravintolan nimi</h1>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservations" element={<Reservation />} />
      </Routes>
    </Router>
  );
}

export default App;
