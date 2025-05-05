// src/context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';
import {deleteUserById} from '../utils/user.js';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));  // Set the user from localStorage if available
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    console.log('Login Token: ', data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updated) => {
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
  };

  const deleteUser = async (id) => {
    const userConfirmed = confirm("Are you sure you want to delete your user?");
    if (userConfirmed) {
      try {
        const result = await deleteUserById(id);
        if (result) {
          console.log('User deleted succesfully.');
          logout(); // redirect will happen after this
        } else {
          alert("User could not be deleted.");
        }
      } catch (error) {
        console.error("Delete failed:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

