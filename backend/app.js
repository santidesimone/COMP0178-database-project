// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index'); // Import the routes module

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

// Use the routes
app.use('/', routes); // Mount the routes at the root path

// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});