-- Queries and Their Explanations

-- Get all auctions in a specific category:
-- Purpose: To retrieve all auctions in a specific category (e.g., "Electronics").
SELECT a.AuctionID, a.StartingPrice, a.ReservePrice, a.StartDate, a.EndDate, i.CategoryName
FROM Auctions a
JOIN ItemCategory i ON a.CategoryID = i.CategoryID
WHERE i.CategoryName = 'Electronics';
-- Get the category for a specific auction:

-- Purpose: To find the category associated with a specific auction. This is useful for displaying the category name for an auction.
SELECT a.AuctionID, i.CategoryName
FROM Auctions a
JOIN ItemCategory i ON a.CategoryID = i.CategoryID
WHERE a.AuctionID = 1;  -- Replace with the specific AuctionID

-- Fetch all auctions for a seller in a specific category:
-- Purpose: To list all auctions from a seller in a specific category (e.g., "Fashion").
SELECT a.AuctionID, a.StartingPrice, a.ReservePrice, a.StartDate, a.EndDate, i.CategoryName
FROM Auctions a
JOIN ItemCategory i ON a.CategoryID = i.CategoryID
WHERE a.SellerID = 1  -- Replace with the Seller's ID
AND i.CategoryName = 'Fashion';

-- Get the most popular category based on the number of auctions:
-- Purpose: To identify the most popular category based on the number of auctions. This can help track trending auction categories.
SELECT i.CategoryName, COUNT(a.AuctionID) AS NumberOfAuctions
FROM Auctions a
JOIN ItemCategory i ON a.CategoryID = i.CategoryID
GROUP BY i.CategoryName
ORDER BY NumberOfAuctions DESC;

-- Get the seller's address:
-- Purpose: To retrieve the seller's business address. This can be useful when displaying seller information for a given auction.
SELECT 
    s.StreetAddress,
    s.City,
    s.StateProvince,
    s.PostalCode,
    s.Country
FROM SellerDetails s
WHERE s.SellerID = 1;  -- Replace with the specific SellerID

-- Get all questions for a specific auction:
-- Purpose: To retrieve all questions made by buyers for a specific auction.
SELECT q.QuestionID, q.QuestionText, q.QuestionDate, u.Username AS BuyerUsername
FROM Questions q
JOIN Users u ON q.BuyerID = u.User_ID
WHERE q.AuctionID = 1;  -- Replace with the specific AuctionID

-- Get the answer for a specific question:
-- Purpose: To retrieve the answer given by the seller for a specific question. This helps provide the response for a buyer's inquiry.
SELECT a.AnswerText, a.AnswerDate, u.Username AS SellerUsername
FROM Answers a
JOIN Users u ON a.SellerID = u.User_ID
WHERE a.QuestionID = 1;  -- Replace with the specific QuestionID

-- Update the highest bid for an auction:
-- Purpose: To update the highest bid for an auction based on the latest bid received.
UPDATE Auctions
SET HighestBid = 5  -- Replace with the specific BidID
WHERE AuctionID = 1;  -- Replace with the specific AuctionID

-- Calculate the average rating for a seller:
-- Purpose: To calculate the average rating for a seller based on all ratings for their completed auctions.
SELECT AVG(rating) AS AverageSellerRating
FROM AuctionRatings
WHERE AuctionID IN (SELECT AuctionID FROM Auctions WHERE SellerID = 1);  -- Replace with the specific SellerID

-- Get the auction winner:
-- Purpose: To get the user who made the highest bid and thus won the auction.
SELECT b.UserID, b.BidAmount
FROM Bids b
WHERE b.AuctionID = 1  -- Replace with the specific AuctionID
ORDER BY b.BidAmount DESC
LIMIT 1;

-- Summary
-- This script creates a comprehensive database model for an auction platform with the following tables:
-- Users: Stores basic user information.
-- UserStatus: Stores possible user statuses (active, deactivated, banned).
-- BuyerDetails and SellerDetails: Store specific information related to buyers and sellers.
-- ItemCategory: Defines auction categories.
-- Auctions: Stores auction-related information, including the relationship with sellers and categories.
-- Bids: Stores bids placed on auctions.
-- AuctionRatings: Stores ratings given by buyers for auctions they won.
-- Questions and Answers: Store questions made by buyers and the corresponding answers by sellers.
-- The queries provided help interact with the database, including fetching, updating, and calculating auction-related data based on various criteria.