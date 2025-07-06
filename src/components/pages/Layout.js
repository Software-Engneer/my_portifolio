import React from "react";
import styles from "./Layout.module.css";
import Modal from "../Modal";
import Contact from "./Contact";
import Messages from "./messages";
import { useState } from "react";

function Layout({ children }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          {/* Left: Location only, red rounded border */}
          <div className={styles.locationBox}>
            <span className={styles.icon} aria-label="Location">{/* Location SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <div className={styles.locationInfo}>
              <span className={styles.locationText}>Lilongwe, Malawi</span>
              <span className={styles.phoneText}>+265 884 588 576</span>
            </div>
          </div>
          {/* Center: Social icons with heading */}
          <div className={styles.socialCenter}>
            <div className={styles.socialHeading}>Join our social community</div>
            <div className={styles.socialIcons}>
              <a href="mailto:chikondimatumula@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                {/* Email SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
              <a href="https://t.me/chikondimatumula" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                {/* Telegram SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
              </a>
              <a href="https://github.com/chikondi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
              </a>
              <a href="https://linkedin.com/in/chikondi-matumula" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/></svg>
              </a>
            </div>
          </div>
          {/* Right: Contact Us with message */}
          <div className={styles.contactBox}>
            <div className={styles.contactHeading}><b>Let's Discuss What Next</b></div>
            <div className={styles.contactSubtext}>Have a project or question?<br />Would love to hear from you.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', justifyContent: 'center' }}>
              <span className={styles.contactUsText}>Contact Us</span>
              <button
                className={styles.arrowBtn}
                onClick={() => setModalOpen(true)}
                aria-label="Contact Us"
              >
                <span className={styles.arrowIcon}>&gt;</span>
              </button>
            </div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <Contact />
            </Modal>
          </div>
        </div>
        <hr className={styles.footerLine} />
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Chikondi Matumula.<br />
          All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout; 