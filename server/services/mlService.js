const axios = require('axios');

/**
 * ML Service for Student Performance Evaluation
 * Calls a Python Flask API that uses Random Forest for prediction.
 */

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001/predict';

/**
 * Predict student performance by calling the external ML service.
 * @param {Object} studentData - Contains attendanceRate, midtermScore, quizRate, etc.
 * @returns {Promise<Object>} Predicted result from Python service.
 */
const predictPerformance = async (studentData) => {
  try {
    const response = await axios.post(ML_SERVICE_URL, studentData);
    return response.data;
  } catch (error) {
    console.error('Error calling ML service:', error.message);
    // Return a fallback prediction if the service is down
    return {
      predictedGrade: 0.5,
      status: 'Average',
      isFallback: true
    };
  }
};

module.exports = {
  predictPerformance
};
