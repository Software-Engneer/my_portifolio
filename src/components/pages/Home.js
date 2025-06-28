import React, { useState, useEffect } from "react";
import { fetchFromAPI, API_ENDPOINTS } from "../../config/api";
import styles from "./Home.module.css";

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFromAPI(API_ENDPOINTS.HOME);
        setHomeData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className={styles.homeContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.homeContainer}>
        <div className={styles.error}>
          <h2>Error Loading Content</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <h2>{homeData?.title || 'Welcome to My Portfolio'}</h2>
      
      {homeData?.hero && (
        <div className={styles.hero}>
          <h3>{homeData.hero.title}</h3>
          <h4>{homeData.hero.subtitle}</h4>
          <p>{homeData.hero.description}</p>
        </div>
      )}

      <div className={styles.intro}>
        <p>
          Hello! I'm Chikondi Matumula, a passionate software developer with
           a strong interest in building web applications and exploring emerging
            technologies. I have hands-on experience with a range of programming 
            languages and frameworks including Java, JavaScript, React, PHP, 
            Kotlin, and Flutter, which I use to create responsive and efficient 
            applications. My background also includes UI/UX design using Figma and 
            Canva, enabling me to craft user-friendly and visually appealing 
            interfaces. I'm skilled in database management with systems like 
            PostgreSQL, MySQL, and SQLite, and I use data analysis tools such as 
            SPSS, STATA, and Power BI to draw insights from data. For version 
            control and development, I rely on Git, GitHub, VS Code, and Android 
            Studio. Additionally, I have a flair for visual creativity, working 
            with Adobe Photoshop and Illustrator for graphic design tasks. Here, 
            you can explore my projects and get a glimpse of the work I'm passionate 
            about.
        </p>
      </div>

      {homeData?.featured && homeData.featured.items && homeData.featured.items.length > 0 && (
        <div className={styles.featured}>
          <h3>{homeData.featured.title}</h3>
          <div className={styles.featuredItems}>
            {homeData.featured.items.map((item, index) => (
              <div key={index} className={styles.featuredItem}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
