import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <a href="/" className={styles.logo}>
          Innovative Tech Malawi
        </a>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navLink}>Home</a></li>
            <li><a href="/projects" className={styles.navLink}>Projects</a></li>
            <li><a href="/contact" className={styles.navLink}>Contact</a></li>
            <li><a href="/about" className={styles.navLink}>About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 