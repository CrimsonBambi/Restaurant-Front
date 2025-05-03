import {BrowserRouter as Router, Routes, Route, Link} from 'react-router';
import Profile from './view/Profile';
import Login from './view/Login';
import Logout from './view/Logout';
import Register from './view/Register';
import MenuPage from './view/MenuPage';
import './css/header.css';
import './App.css';
import Reservation from './view/Reservation';
import Frontpage from './view/Frontpage';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {

  const { user } = useContext(UserContext);

  return (
    <Router>
      <>
      <header className="header">
        <div className="restaurant-name">
          <h1>Ravintolan nimi</h1>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          {user ? (
            <>
              <Link to="/profile" className="nav-link">Profiili</Link>
              <Link to="/logout" className="nav-link">Kirjaudu Ulos</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Kirjaudu</Link>
              <Link to="/register" className="nav-link">Rekisteröidy</Link>
            </>
          )}
        </nav>
      </header>

      <div className="main-container">
      <Routes>
      <Route path="/" element={<Frontpage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservations" element={<Reservation />} />
      </Routes>
      </div>

      <footer>
        <div id="page-footer">
          <div id="contact-info">
            <p>Restaurant Name</p>
            <p>Address</p>
            <p>Phone number</p>
            <p>email@email.com</p>
            <button id="feedback">Leave Feedback!</button>
          </div>
        </div>
      </footer>
      </>
    </Router>

  );
}

export default App;
