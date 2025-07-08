import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, fetchFromAPI } from '../../config/api';
import ImageModal from '../ImageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
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
            {(showAll ? activeProjects : activeProjects.slice(0, 4)).map((project) => (
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
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.projectLink || project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          {activeProjects.length > 4 && (
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
