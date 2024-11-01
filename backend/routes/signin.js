// routes/students.js
const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

// Create a new user
router.post('/', (req, res) => {
//   const { name, age, major } = req.body;
//   const query = 'INSERT INTO users (name, age, major) VALUES (?, ?, ?)';
  
//   db.query(query, [name, age, major], (err, results) => {
//     if (err) {
//       console.error('Error creating student:', err.stack);
//       res.status(500).send('Error creating student');
//       return;
//     }
//     res.status(201).json({ id: results.insertId, name, age, major });
//   });
    res.status(200).json({ data: "ok"});
});


module.exports = router;
