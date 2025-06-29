import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFromAPI, API_ENDPOINTS } from "../../config/api";
import styles from "./Home.module.css";

// Get the API URL from environment variables, with fallback to deployed API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://portifolio-api-1-wtml.onrender.com/api';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [creativeLoading, setCreativeLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectsError, setProjectsError] = useState(null);
  const [creativeError, setCreativeError] = useState(null);
  const navigate = useNavigate();

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a data URL, return as is
    if (imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // Construct full URL with API base
    return `${API_BASE_URL}${imagePath}`;
  };

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

    const fetchProjects = async () => {
      try {
        console.log('🔄 Fetching projects...');
        setProjectsLoading(true);
        setProjectsError(null);
        
        const data = await fetchFromAPI(API_ENDPOINTS.PROJECTS);
        console.log('✅ Projects data received:', data);
        setProjects(data.projects || []);
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
        setProjectsError(err.message);
      } finally {
        setProjectsLoading(false);
      }
    };

    const fetchCreativeWorks = async () => {
      try {
        console.log('🔄 Fetching creative works...');
        setCreativeLoading(true);
        setCreativeError(null);
        
        const data = await fetchFromAPI(API_ENDPOINTS.CREATIVE);
        console.log('✅ Creative works data received:', data);
        setCreativeWorks(data.works || []);
      } catch (err) {
        console.error('❌ Error fetching creative works:', err);
        setCreativeError(err.message);
      } finally {
        setCreativeLoading(false);
      }
    };

    fetchHomeData();
    fetchProjects();
    fetchCreativeWorks();
  }, []);

  console.log('🎯 Current state:', { homeData, loading, error, projects, creativeWorks });

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <div className={styles.homeContainer}>
        <div className={styles.loading}>
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

      {/* Projects Section */}
      <section className={styles.projectsSection}>
        <h3 className={styles.sectionTitle}>Projects</h3>
        {projectsLoading ? (
          <div className={styles.loading}>
            <p>Loading projects...</p>
          </div>
        ) : projectsError ? (
          <div className={styles.error}>
            <p>Error loading projects: {projectsError}</p>
          </div>
        ) : (
          <>
            <div className={styles.cardsGrid}>
              {projects.slice(0, 4).map((project, index) => {
                console.log('🔍 Rendering project:', project);
                console.log('🔗 Project link:', project.projectLink);
                const isFullStackCard = project.title && project.title.toLowerCase().includes('full stack developer');
                console.log('🎯 Is Full Stack Card:', isFullStackCard, 'Title:', project.title);
                return (
                  <div 
                    key={project.id} 
                    className={`${styles.card} ${isFullStackCard ? styles.fullStackCard : ''}`}
                  >
                    <div className={styles.cardImage}>
                      <img 
                        src={getImageUrl(project.image)} 
                        alt={project.title}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9qZWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      {project.projectLink && (
                        <a 
                          href={project.projectLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.websiteLink}
                          title="View Live Project"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                      {!project.projectLink && project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.websiteLink}
                          title="View Source Code"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardTitle}>{project.title}</h4>
                      <p className={styles.cardDescription}>{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className={styles.technologies}>
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className={styles.techTag}>{tech}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className={styles.techTag}>+{project.technologies.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {projects.length > 4 && (
              <div className={styles.exploreMoreContainer}>
                <button 
                  onClick={() => navigate('/projects')} 
                  className={styles.exploreMoreButton}
                >
                  Explore More Projects
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Creative Work Section */}
      <section className={styles.creativeSection}>
        <h3 className={styles.sectionTitle}>Creative Work</h3>
        {creativeLoading ? (
          <div className={styles.loading}>
            <p>Loading creative works...</p>
          </div>
        ) : creativeError ? (
          <div className={styles.error}>
            <p>Error loading creative works: {creativeError}</p>
          </div>
        ) : (
          <>
            <div className={styles.cardsGrid}>
              {creativeWorks.slice(0, 4).map((work) => (
                <div key={work.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img 
                      src={getImageUrl(work.images && work.images[0])} 
                      alt={work.title}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DcmVhdGl2ZSBJbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                    {work.featured && (
                      <div className={styles.featuredBadge}>Featured</div>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{work.title}</h4>
                    <p className={styles.cardDescription}>{work.description}</p>
                    <div className={styles.workMeta}>
                      <span className={styles.workType}>{work.type}</span>
                      <span className={styles.workYear}>{work.year}</span>
                    </div>
                    {work.technologies && work.technologies.length > 0 && (
                      <div className={styles.technologies}>
                        {work.technologies.slice(0, 2).map((tech, index) => (
                          <span key={index} className={styles.techTag}>{tech}</span>
                        ))}
                        {work.technologies.length > 2 && (
                          <span className={styles.techTag}>+{work.technologies.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {creativeWorks.length > 4 && (
              <div className={styles.exploreMoreContainer}>
                <button 
                  onClick={() => navigate('/creative')} 
                  className={styles.exploreMoreButton}
                >
                  Explore More Creative Work
                </button>
              </div>
            )}
          </>
        )}
      </section>

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
