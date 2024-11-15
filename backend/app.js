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

//to do: handle asyncronicity
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
  let responseData = {};

  const query = `SELECT * FROM Users WHERE email = '${body.email}' AND password = '${body.password}';`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user:', err.stack);
      return res.status(500).send('Error fetching user');
    }

    if (results.length > 0) {
      responseData = {
        email: results[0]["Email"],
        username: results[0]["Username"],
        userID: results[0]["UserID"]
      };
    } else {
      return res.status(401).json({ message: 'Invalid credentials' }); // 401 Unauthorized
    }

    const query2 = `SELECT * FROM BuyerDetails WHERE userID = '${responseData["userID"]}'`;
    const query3 = `SELECT * FROM SellerDetails WHERE userID = '${responseData["userID"]}'`;

    Promise.all([
      new Promise((resolve, reject) => {
        db.query(query2, (err, results2) => {
          if (err) {
            console.error('Error fetching buyer details:', err.stack);
            reject(err); // Reject the promise if there's an error
          } else {
            if (results2.length > 0) {
              responseData["buyerDetails"] = results2[0];
            }
            resolve(); // Resolve the promise when the query is done
          }
        });
      }),
      new Promise((resolve, reject) => {
        db.query(query3, (err, results3) => {
          if (err) {
            console.error('Error fetching seller details:', err.stack);
            reject(err); // Reject the promise if there's an error
          } else {
            if (results3.length > 0) {
              responseData["sellerDetails"] = results3[0];
            }
            resolve(); // Resolve the promise when the query is done
          }
        });
      })
    ])
    .then(() => {
      // This will execute after both queries are done
      res.status(200).json(responseData); 
    })
    .catch(err => {
      console.error('Error fetching details:', err);
      res.status(500).send('Error fetching details');
    });
  });
});

app.post('/api/auctions', (req, res) => {
  const body = req.body;
  let parsedSellerID = parseFloat(body.SellerID); 
  let parsedCategoryID = parseFloat(body.CategoryID); 

  const query = `INSERT INTO Auctions 
                      (SellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, StartDate, EndDate, CategoryID, ImageURL)
                       VALUES ( 
                              '${parsedSellerID}', 
                              '${body.ItemName}', 
                              '${body.ItemDescription}', 
                              '${body.StartingPrice}', 
                              '${body.ReservePrice}', 
                              '${body.StartDate}', 
                              '${body.EndDate}', 
                              '${parsedCategoryID}', 
                              '${body.ImageURL}');
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});


app.post('/api/search', (req, res) => {
  const body = req.body;
  const keywords = body.keywords;
  const minPrice = body.minPrice;
  const maxPrice = body.maxPrice;
  const category = body.category;
  const city = body.city;
  const stateProvince = body.stateProvince;
  const endDate = body.endDate;
  
  
  let query = `SELECT * FROM Auctions WHERE itemName LIKE ?`;
  const values = [`%${keywords}%`]; 

  if (minPrice) {
    query += ` AND StartingPrice >= ?`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND StartingPrice <= ?`;
    values.push(maxPrice);
  }

  if (category) {
    query += ` AND CategoryID = ?`;
    values.push(category);
  }

  if (city) {
    query += ` AND city = ?`;
    values.push(city);
  }

  if (stateProvince) {
    query += ` AND stateProvince = ?`;
    values.push(stateProvince);
  }

  if (endDate) {
    query += ` AND endDate <= ?`; 
    values.push(endDate);
  }
  console.log(query)
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});