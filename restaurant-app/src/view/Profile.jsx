import './profile.css';
import logo from '../assets/settings.png';


const Profile = () => {
  return (
    <>
      <main>
        <div className="main-container">
          <section id="profile-name">
            <h1>Hello Name!</h1>
          </section>

          <div className="list">
            <ul>
              <li><strong>Name:</strong> John Doe</li>
              <li><strong>Email:</strong> john@example.com</li>
              <li><strong>Phone Number:</strong> +358...</li>
            </ul>
            <section id='button-section'>
              <button id="settings-button">
              <img id='settings' src={logo} alt="Logo" />
              </button>
            </section>
          </div>

          <div className="profile-bottom">
            <section id="registered_since">
              <label id="vip">Registered</label>
              <p>1.3.2025</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
