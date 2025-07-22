import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAdminLoggedIn } = useAdmin();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ProtectedRoute; 