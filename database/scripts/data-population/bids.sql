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

INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`, `BidTime`)
SELECT 
    20,  -- BidAmount
    3,  -- Get BuyerID for any user other than UserID 1
    (SELECT `AuctionID` FROM `Auctions` WHERE `ItemName` = 'iPhone 12 Phone Case' 
        AND `SellerID` = (SELECT `SellerID` FROM `SellerDetails` WHERE `UserID` = 1)),  -- Get AuctionID
    DATE_SUB(CURDATE(), INTERVAL 10 DAY);  -- BidTime 10 days ago



