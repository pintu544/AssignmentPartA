const db = require('./db/db');
const { fetchUsers, fetchPostsForUser } = require('./api/api');

// Function to fetch and store Users and their Posts
async function fetchDataAndStore() {
  try {
    // Fetch Users data from the API
    const users = await fetchUsers();

    // Insert Users data into the database
    const userStmt = db.prepare(
      'INSERT INTO users (id, firstName, lastName, email, username, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
    );

    users.forEach((user) => {
      userStmt.run(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.createdAt
      );
    });

    userStmt.finalize();

    // Fetch and store Posts data for each User
    for (const user of users) {
      const posts = await fetchPostsForUser(user.id);

      const postStmt = db.prepare(
        'INSERT INTO posts (id, userId, title, body, createdAt) VALUES (?, ?, ?, ?, ?)'
      );

      posts.forEach((post) => {
        postStmt.run(
          post.id,
          user.id,
          post.title,
          post.body,
          post.createdAt
        );
      });

      postStmt.finalize();
    }

    console.log('Data fetched and stored successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    db.close();
  }
}

// Initiate the data-fetching process
fetchDataAndStore();
