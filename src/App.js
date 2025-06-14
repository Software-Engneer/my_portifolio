import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';
import Creative from './components/pages/Creative';
import Dashboard from './admin/Dashboard';
import LoginPage from './components/auth/LoginPage';
import './App.css';
import './styles/forced-colors.css';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        screen_hint: 'login'
      }}
    >
      <Router>
        <AuthProvider>
          <div className="App">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/Projects" element={<Projects />} />
                <Route path="/Creative" element={<Creative />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <footer>
              <p className="footer-text">© 2025 My Portfolio</p>
              <p className="footer-text">All rights reserved.</p>
              <p className="social-links">
                <a 
                  href="https://github.com/Software-Engneer" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  GitHub
                </a> | 
                <a 
                  href="https://www.linkedin.com/in/chikondi-matumula-521757302/" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  LinkedIn
                </a>
              </p>
            </footer>
          </div>
        </AuthProvider>
      </Router>
    </Auth0Provider>
  );
}

export default App;
