const axios = require('axios');
const db = require('../db/db'); // Import the database connection

const app_id = '6514ffb5392a653c5991a50a'; // Replace with your actual app_id

// Function to fetch Users data from the API
async function fetchUsers() {
  try {
    const response = await axios.get('https://dummyapi.io/data/v1/user', {
      headers: {
        'app-id': app_id,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

// Function to fetch Posts data for a specific User by user ID
async function fetchPostsForUser(userId) {
  try {
    const response = await axios.get(
      `https://dummyapi.io/data/v1/user/${userId}/post`,
      {
        headers: {
          'app-id': app_id,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchUsers,
  fetchPostsForUser,
};
