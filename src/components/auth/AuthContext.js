import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Simple context without Auth0 for now
  const value = {
    isAuthenticated: false,
    user: null,
    isAdmin: false,
    login: () => console.log('Login not implemented'),
    logout: () => console.log('Logout not implemented')
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