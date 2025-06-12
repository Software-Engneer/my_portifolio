import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
        </Routes>
      </div>
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
    </Router>
  );
}

export default App;
