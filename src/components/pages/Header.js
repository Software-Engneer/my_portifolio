import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import Contact from "./Contact";
import Modal from "../Modal";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const navRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}> 
      <div className={styles.headerContent}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoText}>
            <span className={styles.logoHighlight}>Innovative</span>Tech
          </span>
          <span className={styles.logoSubtext}>Malawi</span>
        </a>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </button>

        <nav
          ref={navRef}
          className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}
        >
          <ul className={styles.navList}>
            <li>
              <a href="/" className={`${styles.navLink} ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Home</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/projects" className={`${styles.navLink} ${isActive('/projects')}`} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Projects</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/creative" className={`${styles.navLink} ${isActive('/creative')}`} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Creative</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/contact" className={`${styles.navLink} ${isActive('/contact')}`} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Contact</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/about" className={`${styles.navLink} ${isActive('/about')}`} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>About</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            {/* GET IN TOUCH button for mobile menu */}
            {isMenuOpen && (
              <li style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <button
                  className={styles.getInTouchButton}
                  onClick={() => {
                    setShowContact(true);
                    setIsMenuOpen(false);
                  }}
                >
                  GET IN TOUCH
                </button>
              </li>
            )}
          </ul>
        </nav>
        {showContact && (
          <Modal open={showContact} onClose={() => setShowContact(false)}>
            <Contact />
          </Modal>
        )}
      </div>
    </header>
  );
};

export default Header; 