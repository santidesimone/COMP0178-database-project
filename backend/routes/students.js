// routes/students.js
const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

// Get all students
router.get('/', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err.stack);
      res.status(500).send('Error fetching students');
      return;
    }
    res.json(results);
  });
});

// Get a single student by ID
router.get('/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'SELECT * FROM students WHERE id = ?';
  
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching student:', err.stack);
      res.status(500).send('Error fetching student');
      return;
    }
    if (results.length === 0) {
      return res.status(404).send('Student not found');
    }
    res.json(results[0]);
  });
});

// Create a new student
router.post('/', (req, res) => {
  const { name, age, major } = req.body;
  const query = 'INSERT INTO students (name, age, major) VALUES (?, ?, ?)';
  
  db.query(query, [name, age, major], (err, results) => {
    if (err) {
      console.error('Error creating student:', err.stack);
      res.status(500).send('Error creating student');
      return;
    }
    res.status(201).json({ id: results.insertId, name, age, major });
  });
});

// Update an existing student
router.put('/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, age, major } = req.body;
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
    res.json({ id: studentId, name, age, major });
  });
});

// Delete a student
router.delete('/:id', (req, res) => {
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
    res.status(204).send();
  });
});

module.exports = router;
