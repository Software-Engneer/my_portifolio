import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Navigation.css';
import Message from './Message';

function Navigation() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 900) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">My Portfolio</Link>
      </div>
      <button
        className={`nav-menu-button${isMenuOpen ? ' active' : ''}`}
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-links${isMenuOpen ? ' open' : ''}`}>
        <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>About</Link>
        <Link to="/projects" className={isActive('/projects')} onClick={() => setIsMenuOpen(false)}>Projects</Link>
        <Link to="/creative" className={isActive('/creative')} onClick={() => setIsMenuOpen(false)}>Creative</Link>
        <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>Contact</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin" className={isActive('/admin')} onClick={() => setIsMenuOpen(false)}>Admin</Link>
            <button
              onClick={() => { setIsMenuOpen(false); logout({ returnTo: window.location.origin }); }}
              className="auth-button"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => { setIsMenuOpen(false); loginWithRedirect(); }}
            className="auth-button"
          >
            Log In
          </button>
        )}
        {windowWidth <= 900 && isMenuOpen && (
          <button
            className="get-in-touch-btn"
            onClick={() => setShowMessage(true)}
          >
            GET IN TOUCH
          </button>
        )}
      </div>
      {showMessage && <Message onClose={() => setShowMessage(false)} />}
    </nav>
  );
}

export default Navigation; 