import React from "react";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.contactInfo}>
            <div><strong>Phone:</strong> +1 234 567 890</div>
            <div><strong>Email:</strong> <a href="mailto:your.email@example.com">your.email@example.com</a></div>
            <div><strong>Location:</strong> Your Location</div>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout; 