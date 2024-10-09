// routes/index.js
const express = require('express');
const studentsRoutes = require('./students'); // Import the students routes

const router = express.Router();

// Use the students routes
router.use('/students', studentsRoutes);

// You can add more route modules here in the future
// e.g. router.use('/courses', coursesRoutes);

module.exports = router;