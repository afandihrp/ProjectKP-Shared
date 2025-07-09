// Import the Pool class from the pg library
const { Pool } = require('pg');

// Create a new pool instance.
// The pool will use the environment variables for the connection configuration.
// See https://node-postgres.com/features/pooling for more details.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export the query function to be used throughout the application
module.exports = {
  query: (text, params) => pool.query(text, params),
};