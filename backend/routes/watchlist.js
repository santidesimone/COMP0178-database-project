const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ data: "ok"});
});

router.get('/:id', (req, res) => {
  res.status(200).json({ data: "ok"});
});

router.post('/', (req, res) => {
  res.status(200).json({ data: "ok"});
});

router.put('/:id', (req, res) => {
  res.status(200).json({ data: "ok"});
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ data: "ok"});
});

module.exports = router;
