const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'database',    // Host machine (because MySQL is exposed on port 3307)
  user: 'root',         // Your MySQL username
  password: 'rootpassword',  // Your MySQL password
  database: 'ucl'    // The database you're working with
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

// Endpoint to get students from the "students" table
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';  // Query to get all students from the table
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err.stack);
      res.status(500).send('Error fetching students');
      return;
    }
    res.json(results);  // Send the query results back as JSON
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
