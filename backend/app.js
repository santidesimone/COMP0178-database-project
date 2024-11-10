// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index'); // Import the routes module
const app = express();
const port = 3000;
const db = require('./db.js'); // Import the database connection

// Use CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

app.post('/api/signup', (req, res) => {
  const body = req.body;
  let response = {}
  const query = `
      INSERT INTO Users (Email, Username, Password, StatusID) 
          VALUES (
                  '${body.email}', 
                  '${body.username}', 
                  '${body.password}', 
                  1);
   `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    else{
      response["user"] = results;

      if (req.body["buyerDetails"]){
        const query2 = `
        INSERT INTO BuyerDetails (UserID, ShippingAddress) 
              VALUES (
                        (SELECT UserID FROM Users WHERE Email = '${body.email}'),
                        '${body.buyerDetails.ShippingAddress}')
        `;
        db.query(query2, (err, results2) => {
          if (err) {
            console.error('Error fetching data:', err.stack);
            response["buyerDetails"] = err;
            res.status(500).send(response);
            return;
          }
          else{
            response["buyerDetails"] = results2;
          }
          // res.status(200).json(response);
        });
      }

      if (req.body["sellerDetails"]){
        const query3 = `
        INSERT INTO SellerDetails (UserID, StreetAddress, City, StateProvince, PostalCode, Country) 
              VALUES ( 
                        (SELECT UserID FROM Users WHERE Email = '${body.email}'),
                        '${body.sellerDetails.StreetAddress}', 
                        '${body.sellerDetails.City}', 
                        '${body.sellerDetails.StateProvince}', 
                        '${body.sellerDetails.PostalCode}', 
                        '${body.sellerDetails.Country}');
        `;
        db.query(query3, (err, results3) => {
          if (err) {
            console.error('Error fetching data:', err.stack);
            // res.status(500).send('Error fetching data');
            response["sellerDetails"] = err;
            res.status(500).send(response);
            return;
          }
          else{
            response["sellerDetails"] = results3;
          }
        });
      }
    }
    res.status(200).json(response);
  });
});

app.post('/api/signin', (req, res) => {
  const body = req.body;
  const query = `SELECT * FROM Users WHERE email = '${body.email}' AND password = '${body.password}';`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err.stack);
      res.status(500).send('Error fetching students');
      return;
    }
    res.json(results);
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});