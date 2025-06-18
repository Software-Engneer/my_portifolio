import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import './Creative.css';

const Creative = () => {
  const [creativeWorks, setCreativeWorks] = useState([]);

  useEffect(() => {
    const fetchCreativeWorks = async () => {
      try {
        const response = await fetch('/api/creative');
        const data = await response.json();
        console.log('Fetched creative works:', data);
        if (data.works && Array.isArray(data.works)) {
          setCreativeWorks(data.works);
        } else {
          console.error('Expected an array of creative works, but received:', data);
        }
      } catch (error) {
        console.error('Error fetching creative works:', error);
      }
    };

    fetchCreativeWorks();
  }, []);

  return (
    <Layout>
      <section className="creative-section">
        <h1 className="creative-title">Creative Works</h1>
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
      </section>
    </Layout>
  );
};

export default Creative;