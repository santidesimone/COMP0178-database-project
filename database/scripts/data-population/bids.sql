-- Insert bids for some of the auctions by some of the User-buyers
-- Auction 1
INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 10), 1, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 1;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 20), 2, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 1;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 50), 3, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 1;


-- Auction 2
INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 10), 1, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 2;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 20), 2, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 2;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 50), 3, `AuctionID` 
FROM `Auctions`
WHERE `AuctionID` = 2;


-- Auction 3
INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 10), 1, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 3;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 20), 2, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 3;

INSERT INTO Bids (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 50), 3, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 3;


-- Auction 4
INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 10), 1, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 4;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 20), 2, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 4;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 50), 3, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 4;


-- Auction 5
INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 10), 1, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 5;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 20), 2, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 5;

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`) 
SELECT (`StartingPrice` + 50), 3, `AuctionID` 
FROM `Auctions` 
WHERE `AuctionID` = 5;

-- INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`, `BidTime`)
-- SELECT 
--     7.00,  -- BidAmount
--     3,  -- Get BuyerID for any user other than UserID 1
--     (SELECT `AuctionID` FROM `Auctions` WHERE `ItemName` = 'iPhone 12 Phone Case' 
--         AND `SellerID` = (SELECT `SellerID` FROM `SellerDetails` WHERE `UserID` = 1)),  -- Get AuctionID
--     DATE_SUB(CURDATE(), INTERVAL 10 DAY);  -- BidTime 10 days ago

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`, `BidTime`)
SELECT 
    7.00,  -- BidAmount
    3,  -- Get BuyerID for any user other than UserID 1
    22, -- AuctionID from Auction.ItemName = iPhone 12 Phone Case' 
    DATE_SUB(CURDATE(), INTERVAL 10 DAY);  -- BidTime 10 days ago


-- Insert bids for auction 1
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 10.00, 4, AuctionID, DATE_SUB(CURDATE(), INTERVAL 1 MONTH) FROM Auctions WHERE ItemName = 'iPhone 12 Phone Case';
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 12.00, 5, AuctionID, DATE_SUB(CURDATE(), INTERVAL 3 WEEK) FROM Auctions WHERE ItemName = 'iPhone 12 Phone Case';
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 15.00, 7, AuctionID, DATE_SUB(CURDATE(), INTERVAL 2 WEEK) FROM Auctions WHERE ItemName = 'iPhone 12 Phone Case';
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 18.00, 8, AuctionID, DATE_SUB(CURDATE(), INTERVAL 1 WEEK) FROM Auctions WHERE ItemName = 'iPhone 12 Phone Case';

-- Insert bids for auction 2
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 13.00, 4, AuctionID, DATE_SUB(CURDATE(), INTERVAL 1 MONTH) FROM Auctions WHERE ItemName = 'Wireless iPhone 15 Charger';
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 16.00, 5, AuctionID, DATE_SUB(CURDATE(), INTERVAL 3 WEEK) FROM Auctions WHERE ItemName = 'Wireless iPhone 15 Charger';
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 18.00, 7, AuctionID, DATE_SUB(CURDATE(), INTERVAL 2 WEEK) FROM Auctions WHERE ItemName = 'Wireless iPhone 15 Charger';
INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) 
SELECT 20.00, 9, AuctionID, DATE_SUB(CURDATE(), INTERVAL 1 WEEK) FROM Auctions WHERE ItemName = 'Wireless iPhone 15 Charger';

-- -- Get the AuctionIDs for the two auctions
-- SET @auction1_id := (SELECT AuctionID FROM Auctions WHERE ItemName = 'iPhone 12 Phone Case');
-- SET @auction2_id := (SELECT AuctionID FROM Auctions WHERE ItemName = 'Wireless iPhone 15 Charger');

-- -- Insert bids for auction 1
-- INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) VALUES
--     (10.00, 4, @auction1_id, DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),
--     (12.00, 5, @auction1_id, DATE_SUB(CURDATE(), INTERVAL 3 WEEK)),
--     (15.00, 7, @auction1_id, DATE_SUB(CURDATE(), INTERVAL 2 WEEK)),
--     (18.00, 8, @auction1_id, DATE_SUB(CURDATE(), INTERVAL 1 WEEK));

-- -- Insert bids for auction 2
-- INSERT INTO Bids (BidAmount, BidderID, AuctionID, BidTime) VALUES
--     (13.00, 4, @auction2_id, DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),
--     (16.00, 5, @auction2_id, DATE_SUB(CURDATE(), INTERVAL 3 WEEK)),
--     (18.00, 7, @auction2_id, DATE_SUB(CURDATE(), INTERVAL 2 WEEK)),
--     (20.00, 9, @auction2_id, DATE_SUB(CURDATE(), INTERVAL 1 WEEK)); 
