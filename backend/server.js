const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

app.use(cors()); // Use the cors middleware

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});