import React, { useState, useEffect, useMemo } from "react";
import { fetchFromAPI, API_ENDPOINTS } from "../../config/api";
import ImageModal from "../ImageModal";
import styles from "./Home.module.css";
import Spinner from '../Spinner';

// Get the API URL from environment variables, with fallback to deployed API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://portifolio-api-1-wtml.onrender.com/api';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [creativeLoading, setCreativeLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectsError, setProjectsError] = useState(null);
  const [creativeError, setCreativeError] = useState(null);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a data URL, return as is
    if (imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // Construct full URL with API base
    return `${API_BASE_URL}${imagePath}`;
  };

  // Handle image click to open modal
  const handleImageClick = (work) => {
    const imageUrl = getImageUrl(work.image);
    setSelectedImage({
      url: imageUrl,
      alt: work.title
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        console.log('🔄 Starting to fetch home data...');
        console.log('📍 API Endpoint:', API_ENDPOINTS.HOME);
        setLoading(true);
        setError(null);
        
        const data = await fetchFromAPI(API_ENDPOINTS.HOME);
        console.log('✅ API Response received:', data);
        setHomeData(data);
      } catch (err) {
        console.error('❌ Error fetching home data:', err);
        console.error('❌ Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('🏁 Fetch operation completed');
      }
    };

    const fetchProjects = async () => {
      try {
        console.log('🔄 Fetching projects...');
        setProjectsLoading(true);
        setProjectsError(null);
        
        const data = await fetchFromAPI(API_ENDPOINTS.PROJECTS);
        console.log('✅ Projects data received:', data);
        setProjects(data.projects || []);
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
        setProjectsError(err.message);
      } finally {
        setProjectsLoading(false);
      }
    };

    const fetchCreativeWorks = async () => {
      try {
        console.log('🔄 Fetching creative works...');
        setCreativeLoading(true);
        setCreativeError(null);
        
        const data = await fetchFromAPI(API_ENDPOINTS.CREATIVE);
        console.log('✅ Creative works data received:', data);
        setCreativeWorks(data.works || []);
      } catch (err) {
        console.error('❌ Error fetching creative works:', err);
        setCreativeError(err.message);
      } finally {
        setCreativeLoading(false);
      }
    };

    fetchHomeData();
    fetchProjects();
    fetchCreativeWorks();
  }, []);

  // Filter only active projects and creative works
  const activeProjects = projects.filter(project => (project.status || 'Active') === 'Active');
  const activeCreativeWorks = creativeWorks.filter(work => (work.status || 'Active') === 'Active');

  // Combine and sort projects and creative works by creation date
  const combinedWorks = useMemo(() => {
    const allWorks = [];
    // Add projects with type identifier
    activeProjects.forEach((project, index) => {
      allWorks.push({
        ...project,
        type: 'project',
        displayType: 'Project',
        createdAt: project.createdAt || new Date().toISOString(),
        image: project.image,
        uniqueId: project.id || `project-${index}-${Date.now()}`
      });
    });
    // Add creative works with type identifier
    activeCreativeWorks.forEach((work, index) => {
      allWorks.push({
        ...work,
        type: 'creative',
        displayType: 'Creative Work',
        createdAt: work.createdAt || new Date().toISOString(),
        image: work.images && work.images[0] ? work.images[0] : work.image,
        uniqueId: work.id || `creative-${index}-${Date.now()}`
      });
    });
    // Sort by creation date (newest first)
    return allWorks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [activeProjects, activeCreativeWorks]);

  console.log('🎯 Current state:', { homeData, loading, error, projects, creativeWorks, combinedWorks });

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <div className={styles.homeContainer}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.log('🚨 Rendering error state:', error);
    return (
      <div className={styles.homeContainer}>
        <div className={styles.error}>
          <h2>Error Loading Content</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  console.log('📄 Rendering home content with data:', homeData);
  // TEMPORARY: Force spinner render for testing
  return <Spinner />;
}

export default Home;
