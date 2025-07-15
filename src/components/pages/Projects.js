import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, fetchFromAPI } from '../../config/api';
import ImageModal from '../ImageModal';
import Spinner from '../Spinner';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Default project image as a data URL
  const DEFAULT_PROJECT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9qZWN0PC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetchFromAPI(API_ENDPOINTS.PROJECTS);
        
        // The API returns { projects: [...] }
        if (response && response.projects && Array.isArray(response.projects)) {
          // Use API base URL without /api for images
          const apiBase = (process.env.REACT_APP_API_URL || 'https://portifolio-api-1-wtml.onrender.com').replace(/\/api$/, '');
          console.log('API Base URL (for images):', apiBase);
          
          const projectsWithImages = response.projects.map(project => {
            let imageUrl = DEFAULT_PROJECT_IMAGE;
            
            if (project.image) {
              if (project.image.startsWith('data:')) {
                // Base64 image
                imageUrl = project.image;
              } else if (project.image.startsWith('http')) {
                // Full URL
                imageUrl = project.image;
              } else {
                // Local path
                imageUrl = `${apiBase}${project.image}`;
              }
            }
            
            console.log(`Project: ${project.title}, Image URL: ${imageUrl.substring(0, 50)}...`);
            
            return {
              ...project,
              imageUrl: imageUrl
            };
          });
          setProjects(projectsWithImages);
          // DEBUG: Log projects with imageUrl to check image sources
          console.log('Projects with imageUrl:', projectsWithImages);
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

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
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

  const handleImageClick = (project) => {
    setSelectedImage({
      url: project.imageUrl,
      alt: project.title
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Filter only active projects
  const activeProjects = projects.filter(project => (project.status || 'Active') === 'Active');

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">My Projects</h2>
      {activeProjects.length === 0 ? (
        <p className="no-projects">No projects available at the moment.</p>
      ) : (
        <>
          <div className="projects-grid">
            {(showAll ? activeProjects : activeProjects.slice(0, 6)).map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-image">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    onClick={() => handleImageClick(project)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_PROJECT_IMAGE;
                    }}
                  />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies project-technologies-left">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag tech-tag-green">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-link-row">
                    <span className="project-link-text">View Project</span>
                    <a
                      href={project.projectLink || '/projects'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label="View Project"
                      onClick={e => {
                        if (!project.projectLink) {
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
                  {project.year && (
                    <span className="project-date project-date-green project-date-bottom">{project.year}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {activeProjects.length > 6 && (
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
        imageUrl={selectedImage?.url}
        imageAlt={selectedImage?.alt}
      />
    </section>
  );
};

export default Projects;
