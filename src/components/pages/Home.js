import React from "react";
import styles from "./Home.module.css";

function Home() {
  console.log('🏠 Home component is rendering!');
  
  return (
    <div className={styles.homeContainer}>
      <h2>Welcome to My Portfolio</h2>
      <p>This is a test to see if the React app is working.</p>
      <p>If you can see this, the basic React app is functioning!</p>
      
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
    </div>
  );
}

export default Home;
