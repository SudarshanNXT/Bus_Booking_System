// AdminPrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token in localStorage
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check if user is an admin

  return token && isAdmin ? children : <Navigate to="/" />; // Redirect to login if no token or not an admin
};

export default AdminPrivateRoute;
