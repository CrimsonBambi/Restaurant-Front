import '../css/register.css';
import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign-up data: ', name, email, phone_number, password, confirmPassword);

    try {
      const response = await fetch('http://10.120.32.81/restaurant/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone_number, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('Login successful', data);

    } catch (error) {
      console.error('Error during login', error);
      setErrorMessage('Something went wrong');
    }
  }

  return (
    <div id="register-container">
      <form onSubmit={handleSubmit} id="register-form">
        <h2>Rekisteröidy</h2>

        <div className="register-input">
          <div id="register-input-left">
              <label><strong>Nimi</strong></label>
              <input type="text" value={name} placeholder="Syötä koko nimi" onChange={(e) => setName(e.target.value)}required />
              <label><strong>Sähköpostioisoite</strong></label>
              <input type="email" value={email} placeholder="Syötä sähköpostiosoite" onChange={(e) => setEmail(e.target.value)}required />
              <label><strong>Puhelinnumero</strong></label>
              <input type="text" nvalue={phone_number} placeholder="Syötä puhelinnumero" onChange={(e) => setNumber(e.target.value)} required />
          </div>
          <div id="register-input-right">
          <label><strong>Salasana</strong></label>
          <input type="password" value={password} placeholder="Syötä salasana" onChange={(e) => setPassword(e.target.value)} required />
            <label><strong>Varmista salasana</strong></label>
            <input type="password" value={confirmPassword} placeholder="Syötä salasana uudelleen" onChange={(e) => setConfirmPassword(e.target.value)} required />
            <div id='error'>
            </div>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Rekisteröidy</button>
      </form>
    </div>
  )
};

export default Register;
