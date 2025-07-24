import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    // Redirect to correct dashboard if logged in but wrong role
    if (user.role === 'teacher') return <Navigate to="/teacher" />;
    if (user.role === 'student') return <Navigate to="/student" />;
    if (user.role === 'parent') return <Navigate to="/parent" />;
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute; 