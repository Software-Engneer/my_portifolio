import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import './Creative.css';

const Creative = () => {
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreativeWorks = async () => {
      try {
        setLoading(true);
        // Use the static JSON file from public folder
        const response = await fetch('/creative.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched creative works:', data);
        
        if (data.works && Array.isArray(data.works)) {
          setCreativeWorks(data.works);
        } else {
          console.error('Expected an array of creative works, but received:', data);
          setError('Invalid data format received');
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
      <Layout>
        <div className="loading-container">
          <p>Loading creative works...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="creative-section">
        <h1 className="creative-title">Creative Works</h1>
        {creativeWorks.length === 0 ? (
          <p className="no-works">No creative works available at the moment.</p>
        ) : (
          <div className="creative-grid">
            {creativeWorks.map((work) => (
              <div className="creative-card" key={work.id}>
                <div className="creative-image">
                  <img src={work.image} alt={work.title} />
                </div>
                <div className="creative-content">
                  <h3 className="creative-title">{work.title}</h3>
                  <p className="creative-description">{work.description}</p>
                  <a href="#" className="view-more-link">View More</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Creative;