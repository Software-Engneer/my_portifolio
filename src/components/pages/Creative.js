import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, fetchFromAPI } from '../../config/api';
import ImageModal from '../ImageModal';
import './Creative.css';
import Spinner from '../Spinner';

const Creative = () => {
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedWork, setSelectedWork] = useState(null);
  const [showAll, setShowAll] = useState(false);

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
          const apiBase = (process.env.REACT_APP_API_URL || 'https://portifolio-api-1-wtml.onrender.com').replace(/\/api$/, '');
          console.log('Creative API Base URL:', apiBase);
          
          const processedWorks = response.works.map(work => {
            // Handle multiple images for creative works
            const processedImages = work.images ? work.images.map(image => {
              let imageUrl = DEFAULT_CREATIVE_IMAGE;
              
              if (image.startsWith('data:')) {
                // Base64 image
                imageUrl = image;
              } else if (image.startsWith('http')) {
                // Full URL
                imageUrl = image;
              } else {
                // Local path
                imageUrl = `${apiBase}${image}`;
              }
              
              console.log(`Creative Work: ${work.title}, Image URL: ${imageUrl.substring(0, 50)}...`);
              return imageUrl;
            }) : [];
            
            // Determine main image URL
            let mainImageUrl = DEFAULT_CREATIVE_IMAGE;
            if (work.image) {
              if (work.image.startsWith('data:')) {
                mainImageUrl = work.image;
              } else if (work.image.startsWith('http')) {
                mainImageUrl = work.image;
              } else {
                mainImageUrl = `${apiBase}${work.image}`;
              }
            } else if (processedImages.length > 0) {
              mainImageUrl = processedImages[0];
            }
            
            return {
              ...work,
              image: mainImageUrl,
              imageUrl: mainImageUrl,
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

  const handleImageClick = (work) => {
    setSelectedWork(work);
    setSelectedImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
    setSelectedImageIndex(0);
  };

  const handlePreviousImage = () => {
    if (selectedWork && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedWork && selectedImageIndex < selectedWork.processedImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const getCurrentImageUrl = () => {
    if (!selectedWork) return '';
    
    // If there are multiple images, use the selected index
    if (selectedWork.processedImages && selectedWork.processedImages.length > 0) {
      return selectedWork.processedImages[selectedImageIndex];
    }
    
    // Fallback to main image
    return selectedWork.imageUrl || selectedWork.image;
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Filter only active creative works
  const activeCreativeWorks = creativeWorks.filter(work => (work.status || 'Active') === 'Active');

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
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
    <section className="creative-section" id="creative">
      <h2 className="creative-section-title">Creative Works</h2>
      {activeCreativeWorks.length === 0 ? (
        <p className="no-works">No creative works available at the moment.</p>
      ) : (
        <>
          <div className="creative-grid">
            {(showAll ? activeCreativeWorks : activeCreativeWorks.slice(0, 6)).map((work, index) => (
              <div className="creative-card" key={work.id || `creative-${index}`}>
                <div className="creative-image">
                  <img 
                    src={work.imageUrl || work.image} 
                    alt={work.title || 'Creative Work'}
                    onClick={() => handleImageClick(work)}
                    onError={(e) => handleImageError(e, work.id)}
                    loading="lazy"
                  />
                  {work.featured && (
                    <div className="featured-badge">featured</div>
                  )}
                </div>
                <div className="creative-content">
                  <h3 className="creative-title">{work.title}</h3>
                  <p className="creative-description">{work.description}</p>
                  {work.technologies && work.technologies.length > 0 && (
                    <div className="creative-tags creative-tags-left">
                      {work.technologies.map((tech, index) => (
                        <span key={`${work.id}-tech-${index}`} className="creative-tag creative-tag-green">
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
                    <span className="creative-date creative-date-green creative-date-bottom">{work.year}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {activeCreativeWorks.length > 6 && (
            <div className="explore-more-container">
              <button 
                onClick={toggleShowAll} 
                className="explore-more-btn"
              >
                {showAll ? 'Show Less' : 'Explore More'}
              </button>
            </div>
          )}
        </>
      )}
      
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={getCurrentImageUrl()}
        imageAlt={selectedWork?.title || 'Creative Work'}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
        hasPrevious={selectedWork && selectedImageIndex > 0}
        hasNext={selectedWork && selectedWork.processedImages && selectedImageIndex < selectedWork.processedImages.length - 1}
      />
    </section>
  );
};

export default Creative;