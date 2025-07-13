import React, { useState, useEffect, useMemo } from "react";
import { fetchFromAPI, API_ENDPOINTS } from "../../config/api";
import ImageModal from "../ImageModal";
import styles from "./Home.module.css";
import Spinner from '../Spinner';

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
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Handle image click to open modal
  const handleImageClick = (work) => {
    const imageUrl = getImageUrl(work.image);
    setSelectedImage({
      url: imageUrl,
      alt: work.title
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
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

  // Filter only active projects and creative works
  const activeProjects = projects.filter(project => (project.status || 'Active') === 'Active');
  const activeCreativeWorks = creativeWorks.filter(work => (work.status || 'Active') === 'Active');

  // Combine and sort projects and creative works by creation date
  const combinedWorks = useMemo(() => {
    const allWorks = [];
    // Add projects with type identifier
    activeProjects.forEach((project, index) => {
      allWorks.push({
        ...project,
        type: 'project',
        displayType: 'Project',
        createdAt: project.createdAt || new Date().toISOString(),
        image: project.image,
        uniqueId: project.id || `project-${index}-${Date.now()}`
      });
    });
    // Add creative works with type identifier
    activeCreativeWorks.forEach((work, index) => {
      allWorks.push({
        ...work,
        type: 'creative',
        displayType: 'Creative Work',
        createdAt: work.createdAt || new Date().toISOString(),
        image: work.images && work.images[0] ? work.images[0] : work.image,
        uniqueId: work.id || `creative-${index}-${Date.now()}`
      });
    });
    // Sort by creation date (newest first)
    return allWorks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [activeProjects, activeCreativeWorks]);

  console.log('🎯 Current state:', { homeData, loading, error, projects, creativeWorks, combinedWorks });

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <div className={styles.homeContainer}>
        <Spinner />
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
        <div className={`${styles.hero} ${styles.heroCard}`} style={{ marginBottom: '1rem' }}>
          <h3>{homeData.hero.title}</h3>
          <h4>{homeData.hero.subtitle}</h4>
          <p>{homeData.hero.description}</p>
        </div>
      )}

      {/* Combined Projects & Creative Works Section */}
      <section className={styles.projectsSection} style={{ marginBottom: '1rem' }}>
        <h3 className={styles.sectionTitle}>Latest Work</h3>
        {(projectsLoading || creativeLoading) ? (
          <Spinner />
        ) : (projectsError || creativeError) ? (
          <div className={styles.error}>
            <p>Error loading content: {projectsError || creativeError}</p>
          </div>
        ) : (
          <>
            <div className={styles.cardsGrid}>
              {combinedWorks.slice(0, showAllWorks ? combinedWorks.length : 6).map((work, index) => {
                const isFullStackCard = work.type === 'project' && work.title && work.title.toLowerCase().includes('full stack developer');
                const isAdditionalCard = index >= 6;
                
                return (
                  <div 
                    key={work.uniqueId} 
                    className={`${styles.card} ${isFullStackCard ? styles.fullStackCard : ''} ${isAdditionalCard ? styles.additionalCard : ''}`}
                    style={{
                      animation: isAdditionalCard && showAllWorks ? 'fadeInUp 0.5s ease forwards' : 'none',
                      opacity: isAdditionalCard && !showAllWorks ? 0 : 1,
                      position: 'relative',
                    }}
                  >
                    {/* Year in bottom right for creative works */}
                    {work.type === 'creative' && work.year && (
                      <span className={styles.workYearBottomRight}>{work.year}</span>
                    )}
                    <div className={styles.cardImage}>
                      <img 
                        src={getImageUrl(work.image)} 
                        alt={work.title}
                        onClick={() => handleImageClick(work)}
                        style={{ cursor: 'pointer' }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                      

                      
                      {/* Creative work featured badge */}
                      {work.type === 'creative' && work.featured && (
                        <div className={styles.featuredBadge}>Featured</div>
                      )}
                    </div>
                    
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardTitle}>{work.title}</h4>
                      <p className={styles.cardDescription}>{work.description}</p>
                      
                      {/* Work type and technologies for creative works */}
                      {work.type === 'creative' && (
                        <div className={styles.workMeta}>
                          <span className={styles.workType}>{work.type || 'Creative Work'}</span>
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
                      )}
                      
                      {/* Technologies for projects */}
                      {work.type === 'project' && work.technologies && work.technologies.length > 0 && (
                        <div className={styles.technologies}>
                          {work.technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className={styles.techTag}>{tech}</span>
                          ))}
                          {work.technologies.length > 3 && (
                            <span className={styles.techTag}>+{work.technologies.length - 3}</span>
                          )}
                        </div>
                      )}
                      
                      {/* View Project link for projects */}
                      {work.type === 'project' && (
                        <div className={styles.projectLinkRow}>
                          <span className={styles.projectLinkText}>View Project</span>
                          <a
                            href={work.projectLink || '/projects'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLink}
                            aria-label="View Project"
                            onClick={e => {
                              if (!work.projectLink) {
                                e.preventDefault();
                                window.location.href = '/projects';
                              }
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#arrow-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline', verticalAlign: 'middle'}}>
                              <defs>
                                <linearGradient id="arrow-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#38bdf8" />
                                  <stop offset="1" stopColor="#0ea5e9" />
                                </linearGradient>
                              </defs>
                              <rect x="4" y="4" width="16" height="16" rx="3" stroke="url(#arrow-gradient)" strokeWidth="1.5"/>
                              <path d="M9 15L15 9" />
                              <path d="M11 9h4v4" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Show explore more button if there are more than 6 items */}
            {combinedWorks.length > 6 && (
              <div className={styles.exploreMoreContainer}>
                <button 
                  onClick={() => setShowAllWorks(!showAllWorks)} 
                  className={styles.exploreMoreButton}
                >
                  {showAllWorks ? 'Show Less' : 'Explore More'}
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
      
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage?.url}
        imageAlt={selectedImage?.alt}
      />
    </div>
  );
}

export default Home;
