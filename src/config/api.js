// Get the API URL from environment variables, with fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Log the API URL in development to help with debugging
if (process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', API_BASE_URL);
}

export const API_ENDPOINTS = {
  HOME: `${API_BASE_URL}/home`,
  PROJECTS: `${API_BASE_URL}/projects`,
  ABOUT: `${API_BASE_URL}/about`,
  CONTACT: `${API_BASE_URL}/contact`,
  CREATIVE: `${API_BASE_URL}/creative`,
  PROJECT_RATING: (id) => `${API_BASE_URL}/projects/${id}/rating`,
  CREATIVE_RATING: (id) => `${API_BASE_URL}/creative/${id}/rate`,
};

export const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    // Add a timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(endpoint, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    console.error('API Error:', error);
    throw error;
  }
};

// Helper function to update project rating
export const updateProjectRating = async (projectId, rating) => {
  return fetchFromAPI(API_ENDPOINTS.PROJECT_RATING(projectId), {
    method: 'POST',
    body: JSON.stringify({ rating }),
  });
};

// Helper function to rate creative work
export const rateCreativeWork = async (creativeId, rating) => {
  const url = API_ENDPOINTS.CREATIVE_RATING(creativeId);
  console.log('Calling creative rating API:', url, { rating });
  return fetchFromAPI(url, {
    method: 'POST',
    body: JSON.stringify({ rating }),
  });
}; 