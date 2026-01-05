import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext';

const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to home page with a state indicating they need to login
    return <Navigate to="/" state={{ from: location, requiresAuth: true }} replace />;
  }

  return children;
};

export default ProtectedUserRoute;