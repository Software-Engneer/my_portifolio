import React from 'react';
import Layout from './Layout';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A brief description of the project and its main features. This project demonstrates my skills in web development.",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "/path-to-your-image.jpg",
    githubLink: "https://github.com/yourusername/project-one"
  },
  {
    id: 2,
    title: "Project Two",
    description: "Another amazing project showcasing different aspects of my development capabilities.",
    technologies: ["JavaScript", "Express", "PostgreSQL"],
    image: "/path-to-your-image.jpg",
    githubLink: "https://github.com/yourusername/project-two"
  }
];

const Projects = () => {
  return (
    <Layout>
      <section className="projects-section" id="projects">
        <h2 className="section-title">My Projects</h2>
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
      </section>
    </Layout>
  );
};

export default Projects;
