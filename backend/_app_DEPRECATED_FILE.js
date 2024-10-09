const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

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

app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'SELECT * FROM students WHERE email = ?'; // Query to get a specific student
  
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching student:', err.stack);
      res.status(500).send('Error fetching student');
      return;
    }
    if (results.length === 0) {
      return res.status(404).send('Student not found');
    }
    res.json(results[0]); // Send the specific student result back as JSON
  });
});

app.post('/students', (req, res) => {
  const { name, age, major } = req.body; // Destructure student data from the request body
  const query = 'INSERT INTO students (name, age, major) VALUES (?, ?, ?)';
  
  db.query(query, [name, age, major], (err, results) => {
    if (err) {
      console.error('Error creating student:', err.stack);
      res.status(500).send('Error creating student');
      return;
    }
    res.status(201).json({ id: results.insertId, name, age, major }); // Return the created student
  });
});

app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, age, major } = req.body; // Destructure updated student data
  const query = 'UPDATE students SET name = ?, age = ?, major = ? WHERE id = ?';
  
  db.query(query, [name, age, major, studentId], (err, results) => {
    if (err) {
      console.error('Error updating student:', err.stack);
      res.status(500).send('Error updating student');
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Student not found');
    }
    res.json({ id: studentId, name, age, major }); // Return the updated student
  });
});

app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'DELETE FROM students WHERE id = ?';
  
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Error deleting student:', err.stack);
      res.status(500).send('Error deleting student');
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Student not found');
    }
    res.status(204).send(); // Respond with no content (204)
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
