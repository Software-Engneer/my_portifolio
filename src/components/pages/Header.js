import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
          <ul className={styles.navList}>
            <li>
              <a href="/" className={styles.navLink}>
                <span className={styles.linkText}>Home</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/projects" className={styles.navLink}>
                <span className={styles.linkText}>Projects</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/creative" className={styles.navLink}>
                <span className={styles.linkText}>Creative</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/contact" className={styles.navLink}>
                <span className={styles.linkText}>Contact</span>
                <span className={styles.linkUnderline}></span>
              </a>
            </li>
            <li>
              <a href="/about" className={styles.navLink}>
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