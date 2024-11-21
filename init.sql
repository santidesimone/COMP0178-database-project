CREATE DATABASE IF NOT EXISTS auctions;
USE auctions;

-- 1. Create the `UserStatus` Table
CREATE TABLE `UserStatus` (
    `StatusID` INT AUTO_INCREMENT PRIMARY KEY,
    `StatusName` VARCHAR(50) NOT NULL
);

-- Insert default status values
INSERT INTO `UserStatus` (`StatusName`)
VALUES ('Deactivated'), ('Active'), ('Banned');

-- 2. Create the `Users` Table
CREATE TABLE `Users` (
    `UserID` INT AUTO_INCREMENT PRIMARY KEY,
    `Email` VARCHAR(100) NOT NULL UNIQUE,
    `CreatedDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Username` VARCHAR(100) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `StatusID` INT NOT NULL,
    FOREIGN KEY (`StatusID`) REFERENCES `UserStatus`(`StatusID`)
);

-- 3. Create the `BuyerDetails` Table
CREATE TABLE `BuyerDetails` (
    `BuyerID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT NOT NULL,
    `ShippingAddress` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`)
);

-- 4. Create the `SellerDetails` Table
CREATE TABLE `SellerDetails` (
    `SellerID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT NOT NULL,
    `StreetAddress` VARCHAR(255),
    `City` VARCHAR(100),
    `StateProvince` VARCHAR(100),
    `PostalCode` VARCHAR(20),
    `Country` VARCHAR(100),
    FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`)
);

-- 5. Create the `ItemCategory` Table
CREATE TABLE `ItemCategory` (
    `CategoryID` INT AUTO_INCREMENT PRIMARY KEY,
    `CategoryName` VARCHAR(100) NOT NULL UNIQUE
);

-- Insert default categories
INSERT INTO `ItemCategory` (`CategoryName`)
VALUES
    ('Electronics'),
    ('Fashion'),
    ('Home & Garden'),
    ('Collectibles'),
    ('Toys & Hobbies'),
    ('Sports & Outdoors'),
    ('Automotive'),
    ('Books');

-- ?. Create the `AuctionStatus` Table
CREATE TABLE `AuctionStatus` (`StatusID` INT AUTO_INCREMENT PRIMARY KEY, `StatusName` VARCHAR(255) NOT NULL);
-- Insert default AuctionStatus values
INSERT INTO `AuctionStatus` (`StatusName`) VALUES ('Open'),('Closed');


-- 6. Create the `Auctions` Table
CREATE TABLE `Auctions` (
    `AuctionID` INT AUTO_INCREMENT PRIMARY KEY,
    `SellerID` INT NOT NULL,
    `ItemName` VARCHAR(255),
    `ItemDescription` TEXT,
    `StartingPrice` DECIMAL(10, 2),
    `ReservePrice` DECIMAL(10, 2),
    `ImageURL` VARCHAR(255),
    `StartDate` DATETIME,
    `EndDate` DATETIME,
    -- `HighestBid` INT,
    `AuctionStatusID` INT DEFAULT 1,  -- Add this line
    `CategoryID` INT NOT NULL,
    FOREIGN KEY (`SellerID`) REFERENCES `SellerDetails`(`SellerID`),
    -- FOREIGN KEY (`HighestBid`) REFERENCES `Bids`(`BidID`),
    FOREIGN KEY (`CategoryID`) REFERENCES `ItemCategory`(`CategoryID`)
);

-- 7. Create the `Bids` Table
CREATE TABLE `Bids` (
    `BidID` INT AUTO_INCREMENT PRIMARY KEY,
    `BidAmount` DECIMAL(10, 2) NOT NULL,
    `BidTime` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `BidderID` INT NOT NULL,
    `AuctionID` INT NOT NULL,
    FOREIGN KEY (`BidderID`) REFERENCES `BuyerDetails`(`BuyerID`),
    FOREIGN KEY (`AuctionID`) REFERENCES `Auctions`(`AuctionID`)
);

-- 8. Create the `AuctionRatings` Table
CREATE TABLE `AuctionRatings` (
    `RatingID` INT AUTO_INCREMENT PRIMARY KEY,
    `AuctionID` INT NOT NULL,
    `UserID` INT NOT NULL,  -- This should be the auction winner (Buyer)
    `Rating` INT CHECK (`Rating` BETWEEN 1 AND 5) NOT NULL,
    `RatingDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`AuctionID`) REFERENCES `Auctions`(`AuctionID`),
    FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`)
);

-- 9. Create the `Questions` Table
CREATE TABLE `Questions` (
    `QuestionID` INT AUTO_INCREMENT PRIMARY KEY,
    `AuctionID` INT NOT NULL,
    `BuyerID` INT NOT NULL,
    `QuestionText` TEXT NOT NULL,
    `QuestionDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`AuctionID`) REFERENCES `Auctions`(`AuctionID`),
    FOREIGN KEY (`BuyerID`) REFERENCES `Users`(`UserID`)
);

-- 10. Create the `Answers` Table
CREATE TABLE `Answers` (
    `AnswerID` INT AUTO_INCREMENT PRIMARY KEY,
    `QuestionID` INT NOT NULL,
    `SellerID` INT NOT NULL,
    `AnswerText` TEXT NOT NULL,
    `AnswerDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`QuestionID`) REFERENCES `Questions`(`QuestionID`),
    FOREIGN KEY (`SellerID`) REFERENCES `Users`(`UserID`)
);

CREATE TABLE `Favorites` (
    `FavoriteID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT NOT NULL,
    `AuctionID` INT NOT NULL,
    FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`),
    FOREIGN KEY (`AuctionID`) REFERENCES `Auctions`(`AuctionID`)
);

-- Change authentication method for the root user (or specify another user if needed)
ALTER USER 'root'@'%' IDENTIFIED WITH `mysql_native_password` BY 'rootpassword';

-- Flush privileges to ensure the changes take effect
FLUSH PRIVILEGES;



-- Initial Database Data Population

INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
        VALUES ('sellerbuyer0001@example.com', 'sellerbuyer1990', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
        VALUES (
        (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0001@example.com'),
        '999 Main Street2, Orange, CA 91234'
        );

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
        VALUES (
        (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0001@example.com'), 
        '456 Elm Street', 'Austin', 'IL', '62704', 'USA'
        );


-- User 1
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
    VALUES ('sellerbuyer0002@example.com', 'sellerbuyer1991', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
    VALUES (
        (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0002@example.com'),
        '10 Downing Street, London, SW1A 2AA, UK'
    );

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0002@example.com'), 
    '221B Baker Street', 'London', 'Camden', 'NW1 6XE', 'UK'
);

-- User 2
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('sellerbuyer0003@example.com', 'sellerbuyer0003', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0003@example.com'),
    '32 London Bridge Street, London, SE1 9SG, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0003@example.com'), 
    '7 Savile Row', 'London', 'Kensington', 'W1S 3PE', 'UK'
);

-- User 3
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('sellerbuyer0004@example.com', 'sellerbuyer0004', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0004@example.com'),
    '160 Old Street, London, EC1V 9BW, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0004@example.com'), 
    '50 Abbey Street', 'Keynsham', 'Bath', 'E1 6LT', 'UK'
);

-- User 4
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('sellerbuyer0005@example.com', 'sellerbuyer0005', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0005@example.com'),
    '100 Victoria Embankment, London, EC4Y 0DY, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0005@example.com'), 
    '58 Castle Street', 'Radstock', 'Bath', 'EC3M 4AB', 'UK'
);

-- User 5
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('sellerbuyer0006@example.com', 'sellerbuyer0006', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0006@example.com'),
    '1 Churchill Place, London, E14 5HP, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0006@example.com'), 
    '25 Canada Square', 'London', 'Greater London', 'E14 5LB', 'UK'
);

-- User 6
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('onlybuyer0001@example.com', 'onlybuyer0001', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'onlybuyer0001@example.com'),
    '1 Penny Lane Place, London, E11 5JP, UK'
);

-- User 7
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('onlybuyer0002@example.com', 'onlybuyer0002', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'onlybuyer0002@example.com'),
    '1 McKinsey Place, London, E09 5JP, UK'
);

-- User 7
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('onlyseller0002@example.com', 'onlyseller0002', 'secure', 1);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'onlyseller0002@example.com'), 
    '10 Groove', 'London', 'Holborn', 'E14 5LB', 'UK'
);

--  Adding auctions
INSERT INTO `Auctions` (`SellerID`, `ItemName`, `ItemDescription`, `StartingPrice`, `ReservePrice`, `ImageURL`, `StartDate`, `EndDate`, `CategoryID`) VALUES
    (1, 'Antique Vase', 'A beautiful antique vase from the 19th century.', 50.00, 75.00, 'https://i.ibb.co/BGgHZ3t/1.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 20 WEEK), 4), -- Collectibles
    (2, 'Vintage Record Player', 'A classic record player in excellent condition.', 100.00, 150.00, 'https://i.ibb.co/MCDknZC/2.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 WEEK), 1), -- Electronics
    (3, 'Leather Jacket', 'A stylish leather jacket, barely used.', 75.00, 100.00, 'https://i.ibb.co/svqtrYT/3.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 2), -- Fashion
    (4, 'Rare Book Collection', 'A collection of rare books by various authors.', 200.00, 300.00, 'https://i.ibb.co/0qwZpLT/4.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 30 WEEK), 8), -- Books
    (1, 'Handmade Wooden Table', 'A beautiful handmade wooden table with intricate carvings.', 300.00, 400.00, 'https://i.ibb.co/tYdY13W/5.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 3), -- Home & Garden
    (2, 'Antique Clock', 'A vintage clock in working condition.', 80.00, 120.00, 'https://i.ibb.co/0KxxRW1/7.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 4), -- Collectibles
    (3, 'Designer Dress', 'A stunning designer dress, perfect for special occasions.', 150.00, 200.00, 'https://i.ibb.co/qrtMGZy/8.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 6 WEEK), 2), -- Fashion
    (4, 'Original Painting', 'An original painting by a local artist.', 400.00, 500.00, 'https://i.ibb.co/N9crM5K/9.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 WEEK), 4), -- Collectibles
    (1, 'Set of Silverware', 'A complete set of silverware for 12 people.', 120.00, 180.00, 'https://i.ibb.co/XWv3nF3/10.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 5 WEEK), 3), -- Home & Garden
    (2, 'Vintage Camera', 'A vintage camera in good condition with original case.', 60.00, 90.00, 'https://i.ibb.co/Dp0dCYY/11.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 5 WEEK), 1), -- Electronics
    (1, 'Bluetooth Headphones', 'High-quality wireless Bluetooth headphones with noise-canceling feature.', 50.00, 80.00, 'https://i.ibb.co/wWSk8Rs/12.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 10
     WEEK), 1), -- Electronics
    (2, 'Sports Watch', 'A durable and stylish sports watch with multiple features.', 40.00, 70.00, 'https://i.ibb.co/cCCT1bJ/13.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 WEEK), 6), -- Sports & Outdoors
    (3, 'Vintage Denim Jacket', 'A classic vintage denim jacket in great condition.', 55.00, 90.00, 'https://i.ibb.co/4V7mLTH/14.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 2), -- Fashion
    (4, 'Gardening Set', 'A complete gardening set including tools, gloves, and pots.', 25.00, 45.00, 'https://i.ibb.co/0Q4k1Kd/15.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 3), -- Home & Garden
    (2, 'Electric Scooter', 'A foldable electric scooter with a 10-mile range and fast charging.', 150.00, 220.00, 'https://i.ibb.co/r09zY1p/16.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 6), -- Sports & Outdoors
    (2, 'Car Dashboard Camera', 'A high-definition dashboard camera for your car, with night vision.', 60.00, 100.00, 'https://i.ibb.co/LJLTYzm/17.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 7), -- Automotive
    (5, 'Board Game Set', 'A collection of classic board games, perfect for family nights.', 30.00, 50.00, 'https://i.ibb.co/drP5x4k/18.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 5), -- Toys & Hobbies
    (3, 'Yoga Mat', 'A high-quality, non-slip yoga mat for all fitness levels.', 20.00, 35.00, 'https://i.ibb.co/7Ns4rRm/19.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 WEEK), 8), -- Sports & Outdoors
    (4, 'Classic Car Model', 'A detailed 1:18 scale model of a classic car, limited edition.', 80.00, 120.00, 'https://i.ibb.co/KLNCt0h/20.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 WEEK), 4), -- Collectibles
    (4, 'Novel Collection', 'A set of contemporary novels by best-selling authors.', 40.00, 70.00, 'https://i.ibb.co/w7Q1TtZ/21.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 15 WEEK), 8), -- Books
    (2, 'IKEA Wooden Table', 'IKEA wooden table.', 300.00, 400.00, 'https://i.ibb.co/23h1MkQ/Screenshot-2024-11-16-at-3-59-38-PM.png', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 14 WEEK), 3); -- Home & Garden


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



-- 1. Insert the auction with AuctionStatusID = 2
INSERT INTO `Auctions` 
    (`SellerID`, `ItemName`, `ItemDescription`, `StartingPrice`, `ReservePrice`, `ImageURL`, `StartDate`, `EndDate`, `CategoryID`, `AuctionStatusID`) -- Include AuctionStatusID
SELECT 
    (SELECT `SellerID` FROM `SellerDetails` WHERE `UserID` = 1),  
    'iPhone 12 Phone Case', 
    'Protective and stylish phone case for iPhone 12. Excellent condition.', 
    5.00, 10.00, 'https://i.ibb.co/bdwkSGn/Screenshot-2024-11-20-at-6-19-04-PM.png', 
    DATE_SUB(CURDATE(), INTERVAL 2 MONTH),  
    DATE_SUB(CURDATE(), INTERVAL 1 WEEK), 
    1,  
    2;  -- Set AuctionStatusID to 2 (closed)

-- 2. Insert the bid
INSERT INTO `Bids` (`BidAmount`, `BidderID`, `AuctionID`, `BidTime`)
SELECT 
    7.00,  -- BidAmount
    3,  -- Get BuyerID for any user other than UserID 1
    (SELECT `AuctionID` FROM `Auctions` WHERE `ItemName` = 'iPhone 12 Phone Case' 
        AND `SellerID` = (SELECT `SellerID` FROM `SellerDetails` WHERE `UserID` = 1)),  -- Get AuctionID
    DATE_SUB(CURDATE(), INTERVAL 10 DAY);  -- BidTime 10 days ago



