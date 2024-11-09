// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'database',    // Host machine
  user: 'root',        // Your MySQL username
  password: 'rootpassword', // Your MySQL password
  database: 'auctions'      // The database you're working with
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


