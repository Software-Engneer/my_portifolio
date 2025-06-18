const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  HOME: `${API_BASE_URL}/home`,
  PROJECTS: `${API_BASE_URL}/projects`,
  ABOUT: `${API_BASE_URL}/about`,
  CONTACT: `${API_BASE_URL}/contact`,
  CREATIVE: `${API_BASE_URL}/creative`,
};

export const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 