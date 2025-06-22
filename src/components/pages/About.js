import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <section className={styles.qualificationSection}>
          <h2>Qualifications</h2>
          <div className={styles.qualificationCard}>
            <h3>Education</h3>
            <div className={styles.qualificationItem}>
              <h4>Bachelor of Science in Computer Science</h4>
              <p className={styles.institution}>University of Malawi</p>
              <p className={styles.year}><strong>Graduated: 2025</strong></p>
            </div>
          </div>

          <div className={styles.qualificationCard}>
            <h3>Technical Skills</h3>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <h4>Programming Languages</h4>
                <ul>
                  <li>Java</li>
                  <li>JavaScript</li>
                  <li>PHP</li>
                  <li>Kotlin</li>
                </ul>
              </div>
              <div className={styles.skillCategory}>
                <h4>Frameworks & Libraries</h4>
                <ul>
                  <li>React</li>
                  <li>Flutter</li>
                  <li>Node.js</li>
                </ul>
              </div>
              <div className={styles.skillCategory}>
                <h4>Design Tools</h4>
                <ul>
                  <li>Figma</li>
                  <li>Canva</li>
                  <li>Adobe Photoshop</li>
                  <li>Adobe Illustrator</li>
                </ul>
              </div>
              <div className={styles.skillCategory}>
                <h4>Databases</h4>
                <ul>
                  <li>PostgreSQL</li>
                  <li>MySQL</li>
                  <li>SQLite</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;