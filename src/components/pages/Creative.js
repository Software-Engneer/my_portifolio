import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, fetchFromAPI } from '../../config/api';
import './Creative.css';

const Creative = () => {
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default creative work image as a data URL
  const DEFAULT_CREATIVE_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DcmVhdGl2ZTwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjU1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V29yazwvdGV4dD48L3N2Zz4=';

  useEffect(() => {
    const fetchCreativeWorks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching creative works from:', API_ENDPOINTS.CREATIVE);
        const response = await fetchFromAPI(API_ENDPOINTS.CREATIVE);
        
        console.log('API Response:', response);
        
        if (response && response.works && Array.isArray(response.works)) {
          // Process the creative works and ensure they have proper image URLs
          const processedWorks = response.works.map(work => ({
            ...work,
            image: work.image || DEFAULT_CREATIVE_IMAGE,
            // Ensure the image URL is absolute if it's a relative path
            imageUrl: work.image ? (work.image.startsWith('http') ? work.image : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${work.image}`) : DEFAULT_CREATIVE_IMAGE,
            // Add default rating and interaction data
            rating: work.rating || Math.floor(Math.random() * 5) + 1, // Random rating 1-5
            likes: work.likes || Math.floor(Math.random() * 100) + 10, // Random likes 10-109
            views: work.views || Math.floor(Math.random() * 500) + 50, // Random views 50-549
            isLiked: false // Track if user has liked this work
          }));
          
          console.log('Processed creative works:', processedWorks);
          setCreativeWorks(processedWorks);
        } else {
          console.error('Invalid API response format:', response);
          setError('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching creative works:', error);
        setError(`Failed to load creative works: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCreativeWorks();
  }, []);

  const handleImageError = (e, workId) => {
    console.warn(`Failed to load image for work ${workId}, using fallback`);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = DEFAULT_CREATIVE_IMAGE;
  };

  const handleLike = (workId) => {
    setCreativeWorks(prevWorks => 
      prevWorks.map(work => {
        if (work.id === workId) {
          return {
            ...work,
            likes: work.isLiked ? work.likes - 1 : work.likes + 1,
            isLiked: !work.isLiked
          };
        }
        return work;
      })
    );
  };

  const handleView = (workId) => {
    setCreativeWorks(prevWorks => 
      prevWorks.map(work => {
        if (work.id === workId) {
          return {
            ...work,
            views: work.views + 1
          };
        }
        return work;
      })
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading creative works...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <section className="creative-section">
      <h1 className="creative-title">Creative Works</h1>
      {creativeWorks.length === 0 ? (
        <p className="no-works">No creative works available at the moment.</p>
      ) : (
        <div className="creative-grid">
          {creativeWorks.map((work) => (
            <div className="creative-card" key={work.id}>
              <div className="creative-image">
                <img 
                  src={work.imageUrl || work.image} 
                  alt={work.title || 'Creative Work'}
                  onError={(e) => handleImageError(e, work.id)}
                  loading="lazy"
                  onClick={() => handleView(work.id)}
                />
              </div>
              <div className="creative-content">
                <h3 className="creative-title">{work.title}</h3>
                <p className="creative-description">{work.description}</p>
                
                {/* Star Rating */}
                <div className="rating-section">
                  <div className="stars">
                    {renderStars(work.rating)}
                  </div>
                  <span className="rating-text">({work.rating}/5)</span>
                </div>

                {/* Interaction Stats */}
                <div className="interaction-stats">
                  <div className="stat-item">
                    <button 
                      className={`like-button ${work.isLiked ? 'liked' : ''}`}
                      onClick={() => handleLike(work.id)}
                    >
                      ❤️ {work.likes}
                    </button>
                  </div>
                  <div className="stat-item">
                    <span className="view-count">👁️ {work.views}</span>
                  </div>
                </div>

                {work.tags && work.tags.length > 0 && (
                  <div className="creative-tags">
                    {work.tags.map((tag, index) => (
                      <span key={index} className="creative-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {work.link && (
                  <a 
                    href={work.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="view-more-link"
                  >
                    View More
                  </a>
                )}
                {work.date && (
                  <p className="creative-date">{work.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Creative;