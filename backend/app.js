// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./db.js'); // Import the database connection

// Use CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// //to do: handle asyncronicity
// app.post('/api/signup', (req, res) => {
//   const body = req.body;
//   let response = {}
//   const query = `
//       INSERT INTO Users (Email, Username, Password, StatusID) 
//           VALUES (
//                   '${body.email}', 
//                   '${body.username}', 
//                   '${body.password}', 
//                   1);
//    `;
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching data:', err.stack);
//       res.status(500).send('Error fetching data');
//       return;
//     }
//     else{
//       response["user"] = results;

//       if (req.body["buyerDetails"]){
//         const query2 = `
//         INSERT INTO BuyerDetails (UserID, ShippingAddress) 
//               VALUES (
//                         (SELECT UserID FROM Users WHERE Email = '${body.email}'),
//                         '${body.buyerDetails.ShippingAddress}')
//         `;
//         db.query(query2, (err, results2) => {
//           if (err) {
//             console.error('Error fetching data:', err.stack);
//             response["buyerDetails"] = err;
//             res.status(500).send(response);
//             return;
//           }
//           else{
//             response["buyerDetails"] = results2;
//           }
//           // res.status(200).json(response);
//         });
//       }

//       if (req.body["sellerDetails"]){
//         const query3 = `
//         INSERT INTO SellerDetails (UserID, StreetAddress, City, StateProvince, PostalCode, Country) 
//               VALUES ( 
//                         (SELECT UserID FROM Users WHERE Email = '${body.email}'),
//                         '${body.sellerDetails.StreetAddress}', 
//                         '${body.sellerDetails.City}', 
//                         '${body.sellerDetails.StateProvince}', 
//                         '${body.sellerDetails.PostalCode}', 
//                         '${body.sellerDetails.Country}');
//         `;
//         db.query(query3, (err, results3) => {
//           if (err) {
//             console.error('Error fetching data:', err.stack);
//             // res.status(500).send('Error fetching data');
//             response["sellerDetails"] = err;
//             res.status(500).send(response);
//             return;
//           }
//           else{
//             response["sellerDetails"] = results3;
//           }
//         });
//       }
//     }
//     res.status(200).json(response);
//   });
// });
app.post('/api/signup', (req, res) => {
  const body = req.body;
  let response = {};

  // 1. Insert user data
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
    // 2. Insert buyer details if provided
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
      return Promise.resolve(); // Resolve immediately if no buyer details
    }
  })
  .then(() => {
    // 3. Insert seller details if provided
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
      return Promise.resolve(); // Resolve immediately if no seller details
    }
  })
  .then(() => {
    // 4. Send the response after all insertions are complete
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

  console.log("/api/search': req.body ------------")
  console.log(req.body)
  console.log("------------")

  // Select Auction fields along with City and StateProvince from SellerDetails
  let query = `SELECT A.*, SD.City, SD.StateProvince FROM Auctions A
               JOIN SellerDetails SD ON A.SellerID = SD.SellerID`; // Always join SellerDetails
  const values = []; // Initialize values as an empty array

  // Conditional WHERE clause for keywords
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

  // Conditionally add city and stateProvince filters only if provided in the request body
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

  // Order the results by EndDate (most recent first)
  query += ` ORDER BY A.EndDate DESC`;

  console.log("/api/search': query ------------")
  console.log(query, values)
  console.log("------------")

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }

    // Send the results (which will include City and StateProvince, even if they were not filtered)
    res.json(results);
  });
});

app.post('/api/search/all', (req, res) => {
  // Query to fetch all auctions along with City and StateProvince from SellerDetails
  let query = `
    SELECT A.*, SD.City, SD.StateProvince 
    FROM Auctions A
    JOIN SellerDetails SD ON A.SellerID = SD.SellerID
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
  // const bidderId = req.body.bidderId;
  const AuctionID = req.body.AuctionID;
  const BidderUserID = req.body.BidderUserID;
  // 1. Insert the bid if bidAmount >= StartingPrice (using subquery)
  // let query = `
  //   INSERT INTO Bids (BidAmount, BidderID, AuctionID) 
  //   SELECT ?, ?, ? 
  //   FROM (SELECT StartingPrice FROM Auctions WHERE AuctionID = ?) AS Auction
  //   WHERE Auction.StartingPrice <= ?
  // `;
  console.log("//////// req.body");
  console.log(req.body);
  console.log("//////// req.body");

  // let query = `
  //   INSERT INTO Bids (BidAmount, BidderID, AuctionID) 
  //   SELECT 
  //       ?,                
  //       (SELECT BuyerID FROM BuyerDetails WHERE UserID = ?),
  //       ?                 
  //   FROM (SELECT StartingPrice FROM Auctions WHERE AuctionID = ?) AS Auction
  //   WHERE Auction.StartingPrice < ?;    
  // `;

    const query = `
    INSERT INTO Bids (BidAmount, BidderID, AuctionID) 
    SELECT 
        ${BidAmount},                
        (SELECT BuyerID FROM BuyerDetails WHERE UserID = ${BidderUserID}),
        ${AuctionID}                 
    FROM (SELECT StartingPrice FROM Auctions WHERE AuctionID = ${AuctionID}) AS Auction
    WHERE Auction.StartingPrice <= ${BidAmount};  
  `;
    // console.log('Full query being executed:', query);
  // We already have the auction's StartingPrice in the frontend. However, for extra security, we designed the query for creating a new Bid so that it will only insert a new bid into the Bids table if the condition Auction.StartingPrice <= BidAmount is satisfied.


  db.query(query, [BidAmount, BidderUserID, AuctionID, AuctionID, BidAmount], (err, results) => {
    if (err) {
      console.error('Error inserting bid:', err.stack);
      res.status(500).send('Error inserting bid');
      return;
    }
    // Check if any rows were inserted
    if (results.affectedRows === 0) {
      return res.status(400).send('Bid amount cannot be lower than the starting price or the buyer ID is invalid.');
    }
    res.json(results);
  });
});

app.get('/api/bids/:auctionId', (req, res) => {
  // console.log("executing /api/bids/:auctionId")
  const auctionId = req.params.auctionId;
  // console.log(auctionId)
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
  // console.log("executing/api/auctions/:sellerUserID", sellerUserID)
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
  // console.log("executing /api/buyer/purchases/:buyerUserID", buyerUserID);
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
  // console.log('Full query being executed:', query);

  // db.query(query, [buyerUserID], (err, results) => {
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
  // console.log("executing /api/buyer/bids/:buyerUserID", buyerUserID);
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
  // console.log("executing /api/seller/sales/:sellerUserID", sellerUserID);
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
  // Update auctions that have ended or met reserve price
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

// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});