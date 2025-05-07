import {BrowserRouter as Router, Routes, Route, Link} from 'react-router';
import Profile from './view/Profile';
import Login from './view/Login';
import Logout from './view/Logout';
import Register from './view/Register';
import MenuPage from './view/MenuPage';
import Management from './view/Management';
import './css/header.css';
import './App.css';
import Reservation from './view/Reservation';
import Frontpage from './view/Frontpage';
import {useContext, useState, useEffect} from 'react';
import {UserContext} from './context/UserContext';
import RestaurantInfo from './view/RestaurantInfo';
import {fetchData} from './utils/fetchData';

function App() {
  const {user} = useContext(UserContext);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const info = await fetchData(
          'https://10.120.32.81/restaurant/api/v1/info'
        );
        setRestaurantInfo(info);
      } catch (err) {
        setError('Error fetching restaurant info');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Router>
      <>
        <header className="header">
          <div className="restaurant-name">
            <h1>{restaurantInfo ? restaurantInfo.name : 'Ravintolan nimi'}</h1>
          </div>

          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/menu" className="nav-link">
              Menu
            </Link>
            <Link to="/restaurant-info" className="nav-link">
              Yhteystiedot
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="nav-link">
                  Profiili
                </Link>
                {user.role === 'admin' && (
                  <Link to="/management" className="nav-link">
                    Hallinta
                  </Link>
                )}
                <Link to="/logout" className="nav-link">
                  Kirjaudu Ulos
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Kirjaudu
                </Link>
                <Link to="/register" className="nav-link">
                  Rekisteröidy
                </Link>
              </>
            )}
          </nav>
        </header>

        <div className="main-container">
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/restaurant-info" element={<RestaurantInfo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reservations" element={<Reservation />} />
            <Route
              path="/management"
              element={
                user?.role === 'admin' ? <Management /> : <Link to="/" />
              }
            />
          </Routes>
        </div>

        <footer>
          <div id="page-footer">
            <div id="contact-info">
              {restaurantInfo ? (
                <>
                  <p>{restaurantInfo.name}</p>
                  <p>
                    {restaurantInfo.address}, {restaurantInfo.postal_code}{' '}
                    {restaurantInfo.city}
                  </p>
                  <p>Puh.nro: {restaurantInfo.contact_number}</p>
                  <p>Sähköposti: {restaurantInfo.email}</p>
                </>
              ) : (
                <p>Loading contact info...</p>
              )}
              <button id="feedback">Leave Feedback!</button>
            </div>
          </div>
        </footer>
      </>
    </Router>
  );
}

export default App;
