const sqlite3 = require('sqlite3').verbose();

// Create a SQLite database connection
const db = new sqlite3.Database('../userdata.db');

// Define the schema and create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      username TEXT,
      createdAt TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      userId TEXT,
      title TEXT,
      body TEXT,
      createdAt TEXT,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);
});

// Export the database connection
module.exports = db;
