import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 200) {
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
          className={`nav-menu-button${isMenuOpen ? ' active' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          ref={navRef}
          className={`${styles.nav} ${isMenuOpen ? styles.active + ' open' : ''}`}
        >
          <ul className={styles.navList}>
            <li>
              <a href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Home</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/projects" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Projects</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/creative" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Creative</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>Contact</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.linkText}>About</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 