import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Make sure to use the correct API endpoint
        const response = await fetch('/api/projects', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
        }

        const data = await response.json();
        console.log('Fetched projects:', data);
        
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          console.error('Expected an array of projects, but received:', data);
          setError('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <p>Loading projects...</p>
        </div>
      </Layout>
    );
  }

  // Show error state
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
      <section className="projects-section" id="projects">
        <h2 className="section-title">My Projects</h2>
        {projects.length === 0 ? (
          <p className="no-projects">No projects available at the moment.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Projects;
