import '../css/login.css';
import { useState } from 'react';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with', email, password);

    try {
      const response = await fetch('http://10.120.32.81/restaurant/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('Login successful', data);

      {/*localStorage.setItem('token', data.token); // start using when logout is done*/}

    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div id="login-container">
      <h2>Kirjaudu Sisään</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} id="login-form">
        <div id="login-input">
        <input
          type="email"
          value={email}
          placeholder="Käyttäjä"
          onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          id="password" value={password}
          placeholder="Salasana" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
};

export default Login;
