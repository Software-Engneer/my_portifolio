import React from 'react';
import Layout from './Layout';
import './Creative.css';

const creativeWorks = [
  {
    id: 1,
    title: "Digital Art Collection",
    description: "A series of digital artworks exploring the intersection of technology and nature. Each piece combines organic elements with digital aesthetics.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Photography Series",
    description: "Capturing the beauty of everyday moments through a unique lens. This collection focuses on urban landscapes and street photography.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Design Concepts",
    description: "A showcase of innovative design concepts and prototypes. Exploring new ways to solve everyday problems through creative design.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Creative Writing",
    description: "A collection of short stories and poems that explore various themes and emotions through creative writing.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=60"
  }
];

const Creative = () => {
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