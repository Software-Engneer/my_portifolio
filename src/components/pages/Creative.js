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
          const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
          console.log('Creative API Base URL:', apiBase);
          
          const processedWorks = response.works.map(work => {
            // Handle multiple images for creative works
            const processedImages = work.images ? work.images.map(image => {
              const imageUrl = image.startsWith('http') ? image : `${apiBase}${image}`;
              console.log(`Creative Work: ${work.title}, Image URL: ${imageUrl}`);
              return imageUrl;
            }) : [];
            
            return {
              ...work,
              image: work.image || (processedImages.length > 0 ? processedImages[0] : DEFAULT_CREATIVE_IMAGE),
              // Ensure the image URL is absolute if it's a relative path
              imageUrl: work.image ? (work.image.startsWith('http') ? work.image : `${apiBase}${work.image}`) : (processedImages.length > 0 ? processedImages[0] : DEFAULT_CREATIVE_IMAGE),
              processedImages: processedImages
            };
          });
          
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
                />
              </div>
              <div className="creative-content">
                <h3 className="creative-title">{work.title}</h3>
                <p className="creative-description">{work.description}</p>
                {work.technologies && work.technologies.length > 0 && (
                  <div className="creative-tags">
                    {work.technologies.map((tech, index) => (
                      <span key={index} className="creative-tag">
                        {tech}
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
                {work.year && (
                  <p className="creative-date">{work.year}</p>
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