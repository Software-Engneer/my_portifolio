import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Header from './components/pages/Header';
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';
import Creative from './components/pages/Creative';
import './App.css';
import './styles/forced-colors.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/creative" element={<Creative />} />
          </Routes>
        </Layout>
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
      </AuthProvider>
    </Router>
  );
}

export default App;
