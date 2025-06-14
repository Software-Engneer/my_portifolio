import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, login, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Protected Route - Auth State:', {
      isAuthenticated,
      isAdmin,
      userEmail: user?.email
    });

    const checkAccess = async () => {
      if (!isAuthenticated) {
        console.log('User not authenticated, redirecting to login');
        await login();
      } else if (!isAdmin) {
        console.log('User not admin, redirecting to home');
        navigate('/');
      }
      setIsLoading(false);
    };

    checkAccess();
  }, [isAuthenticated, isAdmin, login, navigate, user]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Redirecting to login...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Access denied. Redirecting to home...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 