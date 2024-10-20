import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token in localStorage

  return token ? children : <Navigate to="/" />; // Redirect to login if no token
};

export default PrivateRoute;
