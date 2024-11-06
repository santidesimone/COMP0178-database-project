const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).json({ data: "ok"});
});

module.exports = router;
