import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import '../css/profile.css';
import logo from '../assets/settings.png';

const Profile = () => {
  const { user, logout } = useContext(UserContext); // Accessing user data from context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false); // If the user exists, stop loading
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching user data
  }

  if (!user) {
    return <div>Please log in first</div>; // If no user data is found
  }

  return (
    <main>
      <div className="main-container">
        <section id="profile-name">
          <h1>Hello {user.name}!</h1> {/* Display user name */}
        </section>

        <div className="list">
          <ul>
            <li><strong>Name:</strong> {user.name}</li> {/* Display name */}
            <li><strong>Email:</strong> {user.email}</li> {/* Display email */}
            <li><strong>Phone Number:</strong> {user.phone_number || 'N/A'}</li> {/* Display phone */}
          </ul>
          <section id="button-section">
            <button id="settings-button">
              <img id="settings" src={logo} alt="Settings" />
            </button>
          </section>
        </div>

        <div className="profile-bottom">
          <section id="registered_since">
            <label id="vip">Registered</label>
            <p>{new Date(user.registration_time).toLocaleDateString()}</p> {/* Format registration date */}
          </section>
        </div>


      </div>
    </main>
  );
};

export default Profile;

