import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {useNavigate} from 'react-router-dom';
import '../css/profile.css';
import logo from '../assets/settings.png';

const Profile = () => {
  const {user, updateUser, deleteUser} = useContext(UserContext); // Accessing user data from context
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false); // If the user exists, stop loading
    }
  }, [user]);

  const handleChange = async (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleDelete = async () => {
    await deleteUser(user.id);
    navigate('/'); // redirect after logout
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Only send changed fields
    const changed = {};

    Object.keys(formData).forEach((key) => {
      const value = formData[key].trim();
      if (value !== '') {
        changed[key] = value;
      }
    });

    if (Object.keys(changed).length === 0) {
      setErrorMessage('Please fill at least one field to update.');
      return;
    }

    try {
      const userId = user.id;
      const response = await fetch(
        `https://10.120.32.81/restaurant/api/v1/users/${userId}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(changed),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Profile update failed.');
        return;
      }

      //await response.json(); // Just consume the response
      updateUser({...user, ...changed}); // merge updated fields with existing user
      console.log('Profile updated');
      setShowModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in first</div>;
  }

  return (
    <div className="profile-container">
      <section id="profile-name">
        <h1>Tervehdys {user.name}!</h1> {/* Display user name */}
      </section>
      <div className="list">
        <ul>
          <li>
            <strong>Nimi:</strong> {user.name}
          </li>{' '}
          {/* Display name */}
          <li>
            <strong>Sähköposti:</strong> {user.email}
          </li>{' '}
          {/* Display email */}
          <li>
            <strong>Puhelinnumero:</strong> {user.phone_number || 'N/A'}
          </li>{' '}
          {/* Display phone */}
        </ul>
        <section id="button-section">
          <button
            id="settings-button"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                phone_number: '',
                password: '',
                confirmPassword: '',
              });
              setShowModal(true);
            }}
          >
            <img id="settings" src={logo} alt="Settings" />
          </button>
        </section>
      </div>

      <div className="profile-bottom">
        <section id="registered_since">
          <label id="vip">Rekisteröity</label>
          <p>{new Date(user.registration_time).toLocaleDateString()}</p>{' '}
          {/* Format registration date */}
        </section>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <form onSubmit={handleSave}>
            <div className="modal">
              <button
                type="button"
                id="close-button"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2>Päivitä tietoja</h2>
              <label>
                <strong>Nimi:</strong>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label>
                <strong>Sähköposti:</strong>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label>
                <strong>Puhelinnumero:</strong>
              </label>
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <label>
                <strong>Salasana:</strong>
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label>
                <strong>Salasana uudelleen:</strong>
              </label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="modal-buttons">
                <button onClick={handleDelete}>Poista Käyttäjä</button>
                <button type="submit">Tallenna</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
