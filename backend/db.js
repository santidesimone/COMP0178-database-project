// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'database', // Host machine
  user: 'root',     //  MySQL username
  password: 'rootpassword', //  MySQL password
  database: 'auctions'      // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;


