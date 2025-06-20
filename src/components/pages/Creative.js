import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, fetchFromAPI } from '../../config/api';
import './Creative.css';

const Creative = () => {
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreativeWorks = async () => {
      try {
        setLoading(true);
        const response = await fetchFromAPI(API_ENDPOINTS.CREATIVE);
        
        if (response && response.works && Array.isArray(response.works)) {
          setCreativeWorks(response.works);
        } else {
          console.error('Invalid API response format:', response);
          setError('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching creative works:', error);
        setError('Failed to load creative works. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreativeWorks();
  }, []);

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
                  src={work.image} 
                  alt={work.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DcmVhdGl2ZTwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjU1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V29yazwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <div className="creative-content">
                <h3 className="creative-title">{work.title}</h3>
                <p className="creative-description">{work.description}</p>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Creative;