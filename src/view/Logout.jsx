
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  console.log('Token before Logout: ', token);

  useEffect(() => {
    logout();
    navigate('/');
  }, []);

  console.log('Token after Logout: ', token);
  return null;
};

export default Logout;


/*const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log('Token before clearing:', storedToken);
      localStorage.clear();
      console.log('Token after clearing:', localStorage.getItem('token'));
    } else {
      console.log('You are already logged out.');
    }

    // Redirect to home page
    navigate('/');
  }, [navigate]);


};

export default Logout;*/

