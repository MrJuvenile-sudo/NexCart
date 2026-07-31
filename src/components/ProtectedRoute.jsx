import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute renders the given element only if the current user is an admin.
 * Otherwise it redirects to the login page.
 */
const ProtectedRoute = ({ element }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
