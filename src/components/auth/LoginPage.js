import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LoginPage.css';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Please log in to access the admin panel</p>
        <button 
          className="login-button"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 