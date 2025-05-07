import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {useNavigate} from 'react-router';
import '../css/login.css';

const Login = () => {
  const {login} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://10.120.32.81/restaurant/api/v1/auth/login',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password}),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('User Data: ', data);

      login(data); // Store token in context + localStorage
      navigate('/profile');
    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div id="login-container">
      <h2>Kirjaudu Sisään</h2>
      <form onSubmit={handleSubmit} id="login-form">
        <div id="login-input">
          <input
            type="email"
            value={email}
            placeholder="Käyttäjä"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Salasana"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
};

export default Login;
