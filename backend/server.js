const express = require('express');
const app = express();
const port = 3000; // The port your backend will run on

// This is the API endpoint your React app will call
app.get('/api/', (req, res) => {
  console.log('Received a request to /api/'); // Log to see if the backend is being hit

  // Send a JSON response with a 'message' property
  res.json({ message: 'Hello from your Express Backend!' });
});

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`✅ Backend server is running at http://localhost:${port}`);
});
