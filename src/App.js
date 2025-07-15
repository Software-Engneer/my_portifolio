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
      </AuthProvider>
    </Router>
  );
}

export default App;
