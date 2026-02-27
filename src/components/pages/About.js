import React, { useState, useEffect } from "react";
import { fetchFromAPI, API_ENDPOINTS } from "../../config/api";
import styles from "./About.module.css";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await fetchFromAPI(API_ENDPOINTS.ABOUT);
        setAboutData(data);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <p className={styles.loading}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <p className={styles.error}>{error}</p>
        </div>
      </div>
    );
  }

  const cvUrl = aboutData?.cvUrl;
  const resumeUrl = aboutData?.resumeUrl;
  const hasDownloads = cvUrl || resumeUrl;

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <section className={styles.downloadSection}>
          <h2>About</h2>
          {hasDownloads ? (
            <div className={styles.downloadCard}>
              <p className={styles.downloadDescription}>
                Download my CV and resume below.
              </p>
              <div className={styles.downloadLinks}>
                {cvUrl && (
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadButton}
                  >
                    Download CV
                  </a>
                )}
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadButton}
                  >
                    Download Resume
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.downloadCard}>
              <p className={styles.noFiles}>No documents available yet.</p>
              <p className={styles.noFilesHint}>
                CV and Resume will appear here once they are uploaded from the admin.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default About;
