// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./db.js');

app.use(cors());
app.use(express.json());

app.post('/api/signup', (req, res) => {
  const body = req.body;
  let response = {};

  const userQuery = `
    INSERT INTO Users (Email, Username, Password, StatusID) 
    VALUES (?, ?, ?, 1);
  `;

  new Promise((resolve, reject) => {
    db.query(userQuery, [body.email, body.username, body.password], (err, userResults) => {
      if (err) {
        console.error('Error inserting user:', err.stack);
        reject(err);
        return;
      }
      response["user"] = userResults;
      resolve();
    });
  })
  .then(() => {

    if (req.body["buyerDetails"]) {
      const buyerQuery = `
        INSERT INTO BuyerDetails (UserID, ShippingAddress) 
        VALUES ((SELECT UserID FROM Users WHERE Email = ?), ?);
      `;
      return new Promise((resolve, reject) => {
        db.query(buyerQuery, [body.email, body.buyerDetails.ShippingAddress], (err, buyerResults) => {
          if (err) {
            console.error('Error inserting buyer details:', err.stack);
            reject(err);
            return;
          }
          response["buyerDetails"] = buyerResults;
          resolve();
        });
      });
    } else {
      return Promise.resolve(); 
    }
  })
  .then(() => {

    if (req.body["sellerDetails"]) {
      const sellerQuery = `
        INSERT INTO SellerDetails (UserID, StreetAddress, City, StateProvince, PostalCode, Country) 
        VALUES ((SELECT UserID FROM Users WHERE Email = ?), ?, ?, ?, ?, ?);
      `;
      return new Promise((resolve, reject) => {
        db.query(
          sellerQuery,
          [
            body.email,
            body.sellerDetails.StreetAddress,
            body.sellerDetails.City,
            body.sellerDetails.StateProvince,
            body.sellerDetails.PostalCode,
            body.sellerDetails.Country
          ],
          (err, sellerResults) => {
            if (err) {
              console.error('Error inserting seller details:', err.stack);
              reject(err);
              return;
            }
            response["sellerDetails"] = sellerResults;
            resolve();
          }
        );
      });
    } else {
      return Promise.resolve(); 
    }
  })
  .then(() => {
    res.status(200).json(response);
  })
  .catch(err => {
    console.error('Error during signup:', err);
    res.status(500).send('Error during signup');
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

// app.post('/api/auctions', (req, res) => {
//   const body = req.body;
//   let parsedSellerID = parseFloat(body.SellerID); 
//   let parsedCategoryID = parseFloat(body.CategoryID); 

//   const query = `INSERT INTO Auctions 
//                       (SellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, StartDate, EndDate, CategoryID, ImageURL)
//                        VALUES ( 
//                               '${parsedSellerID}', 
//                               '${body.ItemName}', 
//                               '${body.ItemDescription}', 
//                               '${body.StartingPrice}', 
//                               '${body.ReservePrice}', 
//                               '${body.StartDate}', 
//                               '${body.EndDate}', 
//                               '${parsedCategoryID}', 
//                               '${body.ImageURL}');
//   `
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching data:', err.stack);
//       res.status(500).send('Error fetching data');
//       return;
//     }
//     res.json(results);
//   });
// });
app.post('/api/auctions', (req, res) => {
  const { SellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, StartDate, EndDate, CategoryID, ImageURL } = req.body;
  const parsedSellerID = parseFloat(SellerID);
  const parsedCategoryID = parseFloat(CategoryID);

  const query = `
    INSERT INTO Auctions 
      (SellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, StartDate, EndDate, CategoryID, ImageURL)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [ parsedSellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, StartDate, EndDate, parsedCategoryID, ImageURL,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error executing query');
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

  let query = `SELECT A.*, SD.City, SD.StateProvince FROM Auctions A
               JOIN SellerDetails SD ON A.SellerID = SD.SellerID`; 
  const values = []; 

  if (keywords) {
    query += ` WHERE A.ItemName LIKE ?`;
    values.push(`%${keywords}%`);
  } 

  if (minPrice) {
    query += ` AND A.StartingPrice >= ?`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND A.StartingPrice <= ?`;
    values.push(maxPrice);
  }

  if (category) {
    query += ` AND A.CategoryID = ?`;
    values.push(category);
  }

  if (city) {
    query += ` AND SD.City = ?`;
    values.push(city);
  }

  if (stateProvince) {
    query += ` AND SD.StateProvince = ?`;
    values.push(stateProvince);
  }

  if (endDate) {
    query += ` AND A.EndDate <= ?`;
    values.push(endDate + " 00:00:00");
  }

  query += ` ORDER BY A.EndDate DESC`;

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }

    res.json(results);
  });
});

app.post('/api/search/all', (req, res) => {
  let query = `
    SELECT A.*, SD.City, SD.StateProvince 
    FROM Auctions A
    JOIN SellerDetails SD ON A.SellerID = SD.SellerID
    WHERE A.EndDate > NOW()
    AND A.AuctionStatusID = 1  
    ORDER BY A.EndDate DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

app.post('/api/bid', (req, res) => {
  const body = req.body;
  const BidAmount = req.body.BidAmount;
  const AuctionID = req.body.AuctionID;
  const BidderUserID = req.body.BidderUserID;
    const query = `
    INSERT INTO Bids (BidAmount, BidderID, AuctionID) 
    SELECT 
        ${BidAmount},                
        (SELECT BuyerID FROM BuyerDetails WHERE UserID = ${BidderUserID}),
        ${AuctionID}                 
    FROM (SELECT StartingPrice FROM Auctions WHERE AuctionID = ${AuctionID}) AS Auction
    WHERE Auction.StartingPrice <= ${BidAmount};  
  `;
  db.query(query, [BidAmount, BidderUserID, AuctionID, AuctionID, BidAmount], (err, results) => {
    if (err) {
      console.error('Error inserting bid:', err.stack);
      res.status(500).send('Error inserting bid');
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(400).send('Bid amount cannot be lower than the starting price or the buyer ID is invalid.');
    }
    res.json(results);
  });
});

app.get('/api/bids/:auctionId', (req, res) => {
  const auctionId = req.params.auctionId;
  const query = `
    SELECT * 
    FROM Bids 
    WHERE AuctionID = ?
    ORDER BY BidAmount DESC
  `;
  db.query(query, [auctionId], (err, results) => {
    if (err) {
      console.error('Error fetching bids:', err.stack);
      res.status(500).send('Error fetching bids');
      return;
    }
    res.json(results);
  });
});

app.get('/api/seller/auctions/:sellerUserID', (req, res) => {
  const sellerUserID = req.params.sellerUserID;
  const query = `
    SELECT A.* 
    FROM Auctions A
    JOIN SellerDetails SD ON A.SellerID = SD.SellerID
    WHERE SD.UserID = ?  
    AND A.AuctionStatusID = 1 
    ORDER BY A.EndDate DESC;
  `;
  db.query(query, [sellerUserID], (err, results) => {
    if (err) {
      console.error('Error fetching auctions:', err.stack);
      res.status(500).send('Error fetching auctions');
      return;
    }
    res.json(results);
  });
});

app.get('/api/buyer/purchases/:buyerUserID', (req, res) => {
  const buyerUserID = req.params.buyerUserID; 
  let query = `
    SELECT A.* 
      FROM Auctions A 
        JOIN (SELECT AuctionID, MAX(BidAmount) 
                AS MaxBidAmount FROM Bids GROUP BY AuctionID) 
                AS MaxBids ON A.AuctionID = MaxBids.AuctionID 
        JOIN Bids B 
              ON A.AuctionID = B.AuctionID 
              AND MaxBids.MaxBidAmount = B.BidAmount 
        JOIN BuyerDetails BD ON B.BidderID = BD.BuyerID 
        WHERE 
              BD.UserID = ${buyerUserID} 
              AND A.EndDate < NOW() 
        ORDER BY A.EndDate DESC;`;

  db.query(query, (err, results) => {
      if (err) {
      console.error('Error fetching auctions:', err.stack);
      res.status(500).send('Error fetching auctions');
      return;
    }
    res.json(results);
  });
});

app.get('/api/buyer/bids/:buyerUserID', (req, res) => {
  const buyerUserID = req.params.buyerUserID;
  const query = `
    SELECT B.*
    FROM Bids B
    JOIN BuyerDetails BD ON B.BidderID = BD.BuyerID
    WHERE BD.UserID = ?
    ORDER BY B.BidTime DESC
  `;

  db.query(query, [buyerUserID], (err, results) => {
    if (err) {
      console.error('Error fetching bids:', err.stack);
      res.status(500).send('Error fetching bids');
      return;
    }
    res.json(results);
  });
});

app.get('/api/seller/sales/:sellerUserID', (req, res) => {
  const sellerUserID = req.params.sellerUserID;
  const query = `
    SELECT A.* 
    FROM Auctions A
    WHERE A.SellerID = ${sellerUserID} AND A.AuctionStatusID = 2 
    AND A.AuctionID IN (SELECT DISTINCT AuctionID FROM Bids) 
    ORDER BY A.EndDate DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching seller sales:', err.stack);
      res.status(500).send('Error fetching seller sales');
      return;
    }
    res.json(results);
  });
});

app.post('/api/update-auctions-status', (req, res) => {
  const query = `
    UPDATE Auctions
    SET AuctionStatusID = 2  
    WHERE (EndDate <= NOW() AND AuctionStatusID = 1)  
       OR AuctionID IN (SELECT AuctionID FROM Bids WHERE BidAmount >= ReservePrice) 
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error updating auction statuses:', err.stack);
      res.status(500).send('Error updating auction statuses');
      return;
    }
    console.log('Auction statuses updated:', results.affectedRows); 
    res.status(200).send('Auction statuses updated successfully');
  });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});