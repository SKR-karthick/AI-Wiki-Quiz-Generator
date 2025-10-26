/**
 * API service for communicating with the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generate a quiz from a Wikipedia URL
 * @param {string} url - Wikipedia article URL
 * @returns {Promise<Object>} Generated quiz data
 */
export const generateQuiz = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate quiz');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

/**
 * Fetch the history of generated quizzes
 * @param {number} limit - Maximum number of results
 * @param {number} offset - Number of results to skip
 * @returns {Promise<Array>} List of quiz history items
 */
export const fetchHistory = async (limit = 100, offset = 0) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/history?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

/**
 * Fetch a specific quiz by ID
 * @param {number} quizId - The quiz ID
 * @returns {Promise<Object>} Complete quiz data
 */
export const fetchQuizDetail = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Quiz not found');
      }
      throw new Error('Failed to fetch quiz details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz detail:', error);
    throw error;
  }
};

/**
 * Fetch API statistics
 * @returns {Promise<Object>} API statistics
 */
export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

/**
 * Health check endpoint
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error health check:', error);
    throw error;
  }
};
