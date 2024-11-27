// app.js
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./db.js');
app.use(cors());
app.use(express.json());

const nodemailer = require('nodemailer'); 

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developer.tester.0000@gmail.com',
    pass: 'securepassword',
  },
});

function generateUniqueId() {
  return crypto.randomBytes(5).toString('hex'); // Generates a 10-character ID
}

app.post('/api/signup', (req, res) => {
  const body = req.body;
  let response = {};
  // Constants for SQL queries
  const SQL_INSERT_USER = `
  INSERT INTO Users (Email, Username, Password, StatusID, InviteCode) 
  VALUES (?, ?, ?, 1, ?);
  `;

  const SQL_INSERT_BUYER_DETAILS = `
  INSERT INTO BuyerDetails (UserID, ShippingAddress) 
  VALUES ((SELECT UserID FROM Users WHERE Email = ?), ?);
  `;

  const SQL_INSERT_SELLER_DETAILS = `
  INSERT INTO SellerDetails (UserID, StreetAddress, City, StateProvince, PostalCode, Country) 
  VALUES ((SELECT UserID FROM Users WHERE Email = ?), ?, ?, ?, ?, ?);
  `;

  // When a new user registers using an invite code, insert a row in the Referrals table:
  const SQL_INSERT_REFERRAL = `
    INSERT INTO Referrals (ReferrerCode, ReferredUserID) 
    VALUES (?, (SELECT UserID FROM Users WHERE Email = ?));
  `;

  const InviteCodeForNewUser = generateUniqueId();  // Generate unique invite code for the new user

  // Insert into Users table
  new Promise((resolve, reject) => {
    db.query(SQL_INSERT_USER, [body.email, body.username, body.password, InviteCodeForNewUser], (err, userResults) => {
      if (err) {
        console.error('Error inserting user:', err.stack);
        reject(err);
        return;
      }
      response["user"] = userResults;
      resolve();
    });
  })
    // Insert into BuyerDetails table (if provided)
    .then(() => {
      if (body.buyerDetails) {
        return new Promise((resolve, reject) => {
          db.query(SQL_INSERT_BUYER_DETAILS, [body.email, body.buyerDetails.ShippingAddress], (err, buyerResults) => {
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
    // Insert into SellerDetails table (if provided)
    .then(() => {
      if (body.sellerDetails) {
        return new Promise((resolve, reject) => {
          db.query(
            SQL_INSERT_SELLER_DETAILS,
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
    // Insert into Referrals table (if InviteCode is provided)
    .then(() => {
      if (body.inviteCode) {
        return new Promise((resolve, reject) => {
          db.query(SQL_INSERT_REFERRAL, [body.inviteCode, body.email], (err, referralResults) => {
            if (err) {
              console.error('Error inserting referral:', err.stack);
              reject(err);
              return;
            }
            response["referral"] = referralResults;
            resolve();
          });
        });
      } else {
        return Promise.resolve(); // No referral, just skip
      }
    })
    // Send success response
    .then(() => {
      res.status(200).json(response);
    })
    // Handle errors
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
        userID: results[0]["UserID"],
        inviteCode: results[0]["InviteCode"]

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
  const { SellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, WinnerPrice, StartDate, EndDate, CategoryID, ImageURL } = req.body;
  const parsedSellerID = parseFloat(SellerID);
  const parsedCategoryID = parseFloat(CategoryID);

  const query = `
    INSERT INTO Auctions 
      (SellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, WinnerPrice, StartDate, EndDate, CategoryID, ImageURL)
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    WHERE EXISTS (
      SELECT 1 FROM SellerDetails WHERE UserID = ?
    )    
  `;
  
  const values = [ 
    parsedSellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, 
    WinnerPrice, StartDate, EndDate, parsedCategoryID, ImageURL, parsedSellerID, 
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

  let query = `SELECT A.*, SD.City, SD.StateProvince 
             FROM Auctions A
             JOIN SellerDetails SD ON A.SellerID = SD.UserID
             WHERE A.AuctionStatusID = 1`;
  const values = []; 

  if (keywords) {
    query += ` AND A.ItemName LIKE ?`;
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
  const { BidAmount, AuctionID, BidderUserID } = req.body;

  const query = `
    INSERT INTO Bids (BidAmount, BidderID, AuctionID)
    SELECT 
        ?, -- BidAmount
        ?, -- BidderID
        ?  -- AuctionID
    FROM Auctions
    WHERE 
        AuctionID = ? AND
        StartingPrice <= ? AND
        EXISTS (SELECT 1 FROM BuyerDetails WHERE UserID = ?) AND
        SellerID != ?;
  `;

  const values = [
    BidAmount,       
    BidderUserID,    
    AuctionID,       
    AuctionID,       
    BidAmount,       
    BidderUserID,    
    BidderUserID,    
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting bid:', err.stack);
      res.status(500).send('Error inserting bid');
      return;
    }

    if (results.affectedRows === 0) {
      return res
        .status(400)
        .send(
          'Invalid bid: The bid amount is too low, the user is not a buyer, or the bidder is the seller.'
        );
    }

    res.status(201).json({ message: 'Bid successfully placed!', results });
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

app.get('/api/seller/auctions/:UserID', (req, res) => {
  const sellerUserID = req.params.UserID; 

  const query = `
    SELECT A.* 
    FROM Auctions A
    JOIN SellerDetails SD ON A.SellerID = SD.UserID -- Ensure proper join with SellerDetails
    WHERE SD.UserID = ?  
      AND A.AuctionStatusID = 1 -- Only active auctions
    ORDER BY A.EndDate DESC; -- Sort by auction end date
  `;

  db.query(query, [sellerUserID], (err, results) => {
    if (err) {
      console.error('Error fetching auctions:', err.stack);
      res.status(500).send('Error fetching auctions');
      return;
    }

    res.json(results); // Return the fetched auctions as JSON
  });
});

app.get('/api/buyer/purchases/:UserID', (req, res) => {
  const buyerUserID = req.params.UserID;
  let query = `
    SELECT A.* 
    FROM Auctions A 
    JOIN (SELECT AuctionID, MAX(BidAmount) AS MaxBidAmount 
          FROM Bids 
          GROUP BY AuctionID) AS MaxBids 
      ON A.AuctionID = MaxBids.AuctionID 
    JOIN Bids B 
      ON A.AuctionID = B.AuctionID 
      AND MaxBids.MaxBidAmount = B.BidAmount 
    WHERE B.BidderID = ? 
    AND A.AuctionStatusID = 2
    ORDER BY A.EndDate DESC;
  `;
  db.query(query, [buyerUserID], (err, results) => {
    if (err) {
      console.error('Error fetching purchases:', err.stack);
      res.status(500).send('Error fetching purchases');
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
    WHERE B.BidderID = ?
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
    WHERE A.SellerID = ${sellerUserID} 
    AND A.AuctionStatusID = 2 
    AND A.AuctionID IN (
      SELECT DISTINCT B.AuctionID 
      FROM Bids B 
      WHERE B.BidAmount >= A.ReservePrice
    )
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

app.get('/api/auction/winner/:AuctionID', (req, res) => {
  const auctionID = req.params.AuctionID;
  const query = `
    SELECT 
      B.BidderID AS WinnerUserID, 
      B.BidAmount AS WinningBidAmount,
      U.Username AS WinnerName, 
      U.Email AS WinnerEmail
    FROM Bids B
    JOIN Users U ON B.BidderID = U.UserID
    JOIN Auctions A ON B.AuctionID = A.AuctionID
    WHERE B.AuctionID = ? 
      AND A.AuctionStatusID = 2 
      AND B.BidAmount >= (SELECT ReservePrice FROM Auctions WHERE AuctionID = ?)
    ORDER BY B.BidAmount DESC
    LIMIT 1
  `;
  
  db.query(query, [auctionID, auctionID], (err, results) => {
    if (err) {
      console.error('Error fetching auction winner:', err.stack);
      res.status(500).send('Error fetching auction winner');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('No bids placed or no winner found');
      return;
    }
    res.json(results[0]);  
  });
});

app.post('/api/update-auctions-status', (req, res) => {
  const query = `
    UPDATE Auctions
    SET AuctionStatusID = 2  
    WHERE (EndDate <= NOW() AND AuctionStatusID = 1)  
    OR AuctionID IN (SELECT AuctionID FROM Bids WHERE BidAmount >= ReservePrice AND BidAmount >= WinnerPrice) 
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err)
      console.error('Error updating auction statuses:', err.stack);
      res.status(500).send('Error updating auction statuses');
      return;
    }
    console.log('Auction statuses updated:', results.affectedRows); 
    res.status(200).json({"message": 'Auction statuses updated successfully'});
  });
});

app.post('/api/watchlist', (req, res) => {
  const { userId, auctionId } = req.body;

  const query = `
    INSERT INTO Watchlist (UserID, AuctionID)
    SELECT ${userId}, ${auctionId}
    WHERE NOT EXISTS (
      SELECT 1 FROM Watchlist WHERE UserID = ${userId} AND AuctionID = ${auctionId}
    )
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error adding element to watchlist:', err.stack);
      res.status(500).send('Error adding watchlist');
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'This item is already in your watchlist' });
    }

    res.status(200).json({ message: 'Added to watchlist' });
  });
});

app.delete('/api/watchlist', (req, res) => {
  const { userId, auctionId } = req.body;

  const query = `
    DELETE FROM Watchlist 
    WHERE UserID = ? AND AuctionID = ?
  `;

  db.query(query, [userId, auctionId], (err, result) => {
    if (err) {
      console.error('Error removing from watchlist:', err.stack);
      res.status(500).send('Error removing from watchlist');
      return;
    }
    res.status(200).json({"message": 'Removed from watchlist'});
  });
});

app.get('/api/watchlist/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT A.*
    FROM Watchlist F
    JOIN Auctions A ON F.AuctionID = A.AuctionID
    WHERE F.UserID = ?
  `;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error adding favorite:', err.stack);
      res.status(500).send('Error adding favorite');
      return;
    }
    res.status(200).json(result);
  });
});

app.post('/api/questions', (req, res) => {
  const { AuctionID, UserID, QuestionText } = req.body;

  const query = `
    INSERT INTO Questions (AuctionID, UserID, QuestionText)
    SELECT ?, ?, ?
    FROM Auctions
    WHERE AuctionID = ? AND SellerID != ?
  `;

  db.query(query, [AuctionID, UserID, QuestionText, AuctionID, UserID], (err, results) => {
    if (err) {
      console.error('Error inserting question:', err.stack);
      return res.status(500).send('Error inserting question');
    }
    if (results.affectedRows === 0) {
      return res.status(400).send('Sellers cannot ask questions on their own auctions, or auction does not exist');
    }
    res.status(201).json({
      message: 'Question added successfully',
      QuestionID: results.insertId,
    });
  });
});

app.get('/api/questions/:AuctionID', (req, res) => {
  const AuctionID = req.params.AuctionID;
  const query = `
    SELECT Q.QuestionID, Q.QuestionText, Q.QuestionDate, U.UserID, U.UserName
    FROM Questions Q
    JOIN Users U ON Q.UserID = U.UserID
    WHERE Q.AuctionID = ?
  `;
  db.query(query, [AuctionID], (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err.stack);
      return res.status(500).send('Error fetching questions');
    }
    if (results.length === 0) {
      console.log(results)
      return res.status(404).send('No questions found for this auction');
    }
    res.status(200).json(results);
  });
});

app.post('/api/answers', (req, res) => {
  const { QuestionID, UserID, AnswerText } = req.body;
  console.log(req.body)

  const query = `
    INSERT INTO Answers (QuestionID, UserID, AnswerText)
    SELECT ?, ?, ?
    FROM Questions Q
    JOIN Auctions A ON Q.AuctionID = A.AuctionID
    WHERE Q.QuestionID = ? AND A.SellerID = ?
  `;

  db.query(query, [QuestionID, UserID, AnswerText, QuestionID, UserID], (err, results) => {
    if (err) {
      console.error('Error inserting answer:', err.stack);
      return res.status(500).send('Error inserting answer');
    }
    if (results.affectedRows === 0) {
      return res.status(400).send('Only sellers can answer questions for their own auctions, or question does not exist');
    }
    res.status(201).json({
      message: 'Answer added successfully',
      AnswerID: results.insertId,
      AnswerText,
      AnswerDate: new Date().toISOString(), // Or your server's timestamp format
    });
  });
});

app.get('/api/answers/:QuestionID', (req, res) => {
  const QuestionID = req.params.QuestionID;

  const query = `
    SELECT A.AnswerID, A.AnswerText, A.AnswerDate, U.UserID, U.UserName, A.QuestionID
    FROM Answers A
    JOIN Users U ON A.UserID = U.UserID
    WHERE A.QuestionID = ?
  `;

  db.query(query, [QuestionID], (err, results) => {
    if (err) {
      console.error('Error fetching answers:', err.stack);
      return res.status(500).send('Error fetching answers');
    }

    if (results.length === 0) {
      // If no answers are found, return a more informative message
      return res.status(404).json({ message: 'No answers found for this auction' });
    }

    // Send back the results as JSON
    res.status(200).json(results);
  });
});

app.post('/api/ratings', (req, res) => {
  const { AuctionID, UserID, Rating } = req.body;

  const query = `
    INSERT INTO AuctionRatings (AuctionID, UserID, Rating)
    SELECT ?, ?, ?
    FROM DUAL
    WHERE NOT EXISTS (
      SELECT 1
      FROM AuctionRatings
      WHERE AuctionID = ? AND UserID = ?
    )
  `;

  db.query(query, [AuctionID, UserID, Rating, AuctionID, UserID], (err, results) => {
    if (err) {
      console.error('Error inserting rating:', err.stack);
      return res.status(500).send('Error processing rating');
    }

    if (results.affectedRows === 0) {
      return res.status(400).json({ message: 'You have already rated this auction' });
    }

    res.status(201).json({ message: 'Rating submitted successfully' });
  });
});

app.post('/api/invite-link-discount', (req, res) => {
  const body = req.body;
  const userEmail = body.email; 
  let response = {};

  // Constants for SQL queries

  // Check User Eligibility for Referral Reward Claim
  const SQL_CHECK_USER_REFERRAL_REWARD_STATUS = `
    SELECT ReferralRewardStatus, InviteCode
    FROM Users
    WHERE Email = ?
  `;

  // Calculate Discount Eligibility
  const SQL_COUNT_REFERRALS = `
    SELECT COUNT(*) AS ReferralCount
    FROM Referrals
    WHERE ReferrerCode = ?
  `;
  // Update User Eligibility for Referral Reward 
  const SQL_UPDATE_REFERRAL_STATUS = `
    UPDATE Users
    SET ReferralRewardStatus = 'Claimed'
    WHERE Email = ?
  `;

  // Step 1: Check the user's ReferralRewardStatus
  new Promise((resolve, reject) => {
    db.query(SQL_CHECK_USER_REFERRAL_REWARD_STATUS, [userEmail], (err, userResults) => {
      if (err) {
        console.error('Error checking user referral status:', err.stack);
        reject(err);
        return;
      }
      if (userResults.length === 0) {
        reject(new Error('User not found'));
        return;
      }
      response["user"] = userResults[0]; // Save user data for reference
      resolve(userResults[0]);
    });
  })
    // Step 2: Check referral count only if ReferralRewardStatus is 'Pending'
    .then((userData) => {
      if (userData.ReferralRewardStatus !== 'Pending') {
        return Promise.reject(new Error('Referral reward has already been claimed or is not pending'));
      }
      
      // Proceed to count the referrals
      return new Promise((resolve, reject) => {
        db.query(SQL_COUNT_REFERRALS, [userData.InviteCode], (err, referralResults) => {
          if (err) {
            console.error('Error checking referral count:', err.stack);
            reject(err);
            return;
          }
          response["referralCount"] = referralResults[0].ReferralCount; // Save referral count
          resolve(referralResults[0].ReferralCount);
        });
      });
    })
    // Step 3: If referral count >= 2, apply the discount and update ReferralRewardStatus
    .then((referralCount) => {
      if (referralCount >= 2) {        
        // Update the ReferralRewardStatus to 'Claimed'
        return new Promise((resolve, reject) => {
          db.query(SQL_UPDATE_REFERRAL_STATUS, [userEmail], (err, updateResults) => {
            if (err) {
              console.error('Error updating referral reward status:', err.stack);
              reject(err);
              return;
            }
            response["updateStatus"] = updateResults;
            resolve();
          });
        });
      } else {
        return Promise.reject(new Error('Referral count is less than 2, discount not applicable'));
      }
    })
    // Send success response
    .then(() => {
      res.status(200).json(response);
    })
    // Handle errors
    .catch(err => {
      console.error('Error during invite link discount process:', err);
      res.status(500).send(err.message || 'Error during invite link discount process');
    });
});

app.get('/api/recommendations/:UserID', (req, res) => {
  const UserID = req.params.UserID;
  const query = `
    WITH UserBids AS (
      -- Get all auctions the user has bid on
      SELECT DISTINCT AuctionID
      FROM Bids
      WHERE BidderID = ?
    ),
    SimilarUsers AS (
      -- Find other users who have bid on the same auctions
      SELECT DISTINCT b.BidderID
      FROM Bids b
      JOIN UserBids ub ON b.AuctionID = ub.AuctionID
      WHERE b.BidderID != ?
    ),
    RecommendedAuctions AS (
      -- Find auctions these similar users are actively bidding on
      SELECT DISTINCT b.AuctionID
      FROM Bids b
      JOIN SimilarUsers su ON b.BidderID = su.BidderID
      WHERE b.AuctionID NOT IN (SELECT AuctionID FROM UserBids) -- Exclude auctions the user has already bid on
    )
    SELECT a.AuctionID, a.ItemName, a.ItemDescription, a.EndDate, a.StartingPrice
    FROM Auctions a
    WHERE a.AuctionID IN (SELECT AuctionID FROM RecommendedAuctions)
    AND a.EndDate > NOW() -- Only include active auctions 
    ORDER BY a.EndDate ASC -- Optional: Order by soonest ending auctions
    LIMIT 5; -- Limit to top 5 recommendations
  `;

  db.query(query, [UserID, UserID], (err, results) => {
    if (err) {
      console.error('Error fetching recommendations:', err.stack);
      return res.status(500).send('An error occurred while fetching recommendations.');
    }
    if (results.length === 0) {
      return res.status(404).send('No recommendations found.');
    }
    res.status(200).json(results);
  });
});
// mysql> SELECT DISTINCT b.BidderID, u.Username  -- Select distinct BidderID and Username
//     -> FROM Bids b
//     -> JOIN Users u ON b.BidderID = u.UserID  -- Join Bids with Users to get Username
//     -> WHERE b.AuctionID IN (1, 2, 3, 4, 5);  -- Filter bids by AuctionID
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});