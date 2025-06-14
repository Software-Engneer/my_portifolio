import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Navigation.css';

function Navigation() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">My Portfolio</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/about" className={isActive('/about')}>About</Link>
        <Link to="/projects" className={isActive('/projects')}>Projects</Link>
        <Link to="/creative" className={isActive('/creative')}>Creative</Link>
        <Link to="/contact" className={isActive('/contact')}>Contact</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin" className={isActive('/admin')}>Admin</Link>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="auth-button"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="auth-button"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation; 