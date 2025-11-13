// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Remove trailing slash if present and add /api prefix
export const API_URL = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) + '/api' : API_BASE_URL + '/api';

// API endpoints
export const ENDPOINTS = {
  CAPTION: '/caption',
  TTS: '/tts',
  TRANSLATE: '/translate',
  HEALTH: '/health'
};

// Helper function to make API calls with proper error handling
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check if the backend is running.');
    }
    throw error;
  }
};

export default { API_URL, ENDPOINTS, apiCall };
