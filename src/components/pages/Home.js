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
        console.log('🔄 Starting to fetch home data...');
        console.log('📍 API Endpoint:', API_ENDPOINTS.HOME);
        setLoading(true);
        setError(null);
        
        const data = await fetchFromAPI(API_ENDPOINTS.HOME);
        console.log('✅ API Response received:', data);
        setHomeData(data);
      } catch (err) {
        console.error('❌ Error fetching home data:', err);
        console.error('❌ Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('🏁 Fetch operation completed');
      }
    };

    fetchHomeData();
  }, []);

  console.log('🎯 Current state:', { homeData, loading, error });

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <div className={styles.homeContainer}>
        <div className={styles.loading}>
          <h2>Loading...</h2>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('🚨 Rendering error state:', error);
    return (
      <div className={styles.homeContainer}>
        <div className={styles.error}>
          <h2>Error Loading Content</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log('📄 Rendering home content with data:', homeData);
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
