import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = () => {
      if (user && user.email) {
        console.log('Current user:', user);
        console.log('Admin email:', process.env.REACT_APP_ADMIN_EMAIL);
        
        const isUserAdmin = user.email === process.env.REACT_APP_ADMIN_EMAIL;
        console.log('Is user admin:', isUserAdmin);
        
        setIsAdmin(isUserAdmin);
        
        // Only redirect if we're not already on the admin page
        if (isUserAdmin && window.location.pathname !== '/admin') {
          try {
            navigate('/admin');
          } catch (error) {
            console.error('Navigation error:', error);
          }
        }
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const login = () => {
    try {
      console.log('Login initiated');
      loginWithRedirect({
        appState: { returnTo: '/admin' },
        authorizationParams: {
          redirect_uri: `${window.location.origin}/admin`
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logoutUser = () => {
    try {
      console.log('Logout initiated');
      logout({ 
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    isAdmin,
    login,
    logout: logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 