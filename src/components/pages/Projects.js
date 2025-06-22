import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, fetchFromAPI, updateProjectRating } from '../../config/api';
import StarRating from '../StarRating';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default project image as a data URL
  const DEFAULT_PROJECT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9qZWN0PC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=';

  // Project images mapping
  const projectImages = {
    'E-commerce Platform': '/images/ecommerce.jpg',
    'Task Management App': '/images/taskmanager.jpg',
    'Portfolio Website': '/images/portfolio.jpg'
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetchFromAPI(API_ENDPOINTS.PROJECTS);
        
        // The API returns { projects: [...] }
        if (response && response.projects && Array.isArray(response.projects)) {
          // Add image paths to projects
          const projectsWithImages = response.projects.map(project => ({
            ...project,
            image: projectImages[project.title] || DEFAULT_PROJECT_IMAGE,
            rating: project.rating || 0
          }));
          setProjects(projectsWithImages);
        } else {
          console.error('Invalid API response format:', response);
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

  // Handle rating change
  const handleRatingChange = async (projectId, newRating) => {
    try {
      // Optimistically update the UI
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId
            ? { ...project, rating: newRating }
            : project
        )
      );

      // Send the update to the API
      await updateProjectRating(projectId, newRating);
    } catch (error) {
      console.error('Error updating rating:', error);
      // Revert the optimistic update on error
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId
            ? { ...project, rating: project.rating }
            : project
        )
      );
      alert('Failed to update rating. Please try again.');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading projects...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">My Projects</h2>
      {projects.length === 0 ? (
        <p className="no-projects">No projects available at the moment.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_PROJECT_IMAGE;
                  }}
                />
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
                <StarRating
                  rating={project.rating}
                  onRatingChange={handleRatingChange}
                  projectId={project.id}
                />
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
  );
};

export default Projects;
