const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

router.post('/signin', (req, res) => {
    // const query = `
    //     INSERT INTO Users (Email, Username, Password, StatusID) 
    //         VALUES (
    //                 '${body.email}', 
    //                 '${body.username}', 
    //                 '${body.password}', 
    //                 1);

    //     SET @last_UserID = LAST_INSERT_ID();

    //     INSERT INTO BuyerDetails (UserID, ShippingAddress)
    //         VALUES (
    //                 @last_UserID, 
    //                 '${body.BuyerDetails.ShippingAddress}');
    //     INSERT INTO SellerDetails (UserID, StreetAddress, City, StateProvince, PostalCode, Country) 
    //         VALUES (    
    //                 @last_UserID,
    //                 '${body.sellerDetails.StreetAddress}', 
    //                 '${body.sellerDetails.City}', 
    //                 '${body.sellerDetails.StateProvince}', 
    //                 '${body.sellerDetails.PostalCode}', 
    //                 '${body.sellerDetails.Country}');
    //  `;

    // db.query(query, (err, results) => {
    //   if (err) {
    //     console.error('Error fetching students:', err.stack);
    //     res.status(500).send('Error fetching students');
    //     return;
    //   }
    //   res.status(200).json(results);
    // });
    res.status(200).json({"data": "ok"});
});

module.exports = router;

// const data = {
//     email: "testuser@example.com",
//     username: "testuser",
//     password: "securePasswordHash", // In a real application, send a hashed password
//     BuyerDetails: {
//       ShippingAddress: "123 Main Street, Anytown, CA 91234",
//     },
//     sellerDetails: {
//       StreetAddress: "456 Elm Street",
//       City: "Springfield",
//       StateProvince: "IL",
//       PostalCode: "62704",
//       Country: "USA",
//     },
//   };