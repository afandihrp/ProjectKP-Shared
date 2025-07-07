// Load environment variables from .env file
// Load environment variables FIRST
require('dotenv').config();

// Now import other modules
const express = require('express');
const db = require('./db'); // Now this will work correctly

// Create an Express application
const app = express();
const port = 3000;

// app.use.express.static('public');

// Define a route to get all login data
// This uses the exact query you provided
app.get('/logins', async (req, res) => {
  try {
    // SECURITY NOTE: In a real application, avoid selecting all columns ('*').
    // Specifically, do not send password hashes or other sensitive data to the client.
    const { rows } = await db.query('SELECT * FROM public.lms_login');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
