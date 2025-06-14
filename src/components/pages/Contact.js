import React from "react";
import Layout from "./Layout";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <Layout>
      <div className={styles.contactContainer}>
        <h2>Get in Touch</h2>
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <i className="fas fa-envelope"></i>
                <h4>Email</h4>
                <p>chikondimatumula@gmail.com</p>
              </div>
              <div className={styles.infoItem}>
                <i className="fas fa-phone"></i>
                <h4>Phone</h4>
                <p>+265 884588576 / 991337347</p>
              </div>
              <div className={styles.infoItem}>
                <i className="fas fa-map-marker-alt"></i>
                <h4>Location</h4>
                <p>Lilongwe, Malawi</p>
              </div>
              <div className={styles.infoItem}>
                <i className="fab fa-github"></i>
                <h4>GitHub</h4>
                <a href="https://github.com/Software-Engneer" target="_blank" rel="noopener noreferrer">
                  github.com/Software-Engineer
                </a>
              </div>
              <div className={styles.infoItem}>
                <i className="fab fa-linkedin"></i>
                <h4>LinkedIn</h4>
                <a href="https://linkedin.com/in/chikondi-matumula-521757302/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/chikondi-matumula-521757302/
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
