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

-- 6. Create the `Auctions` Table
-- CREATE TABLE `Auctions` (
--     `AuctionID` INT AUTO_INCREMENT PRIMARY KEY,
--     `SellerID` INT NOT NULL,
--     `StartingPrice` DECIMAL(10, 2),
--     `ReservePrice` DECIMAL(10, 2),
--     `ImageURL` VARCHAR(255),
--     `StartDate` DATETIME,
--     `EndDate` DATETIME,
--     -- `HighestBid` INT,
--     `CategoryID` INT NOT NULL,
--     FOREIGN KEY (`SellerID`) REFERENCES `SellerDetails`(`SellerID`),
--     -- FOREIGN KEY (`HighestBid`) REFERENCES `Bids`(`BidID`),
--     FOREIGN KEY (`CategoryID`) REFERENCES `ItemCategory`(`CategoryID`)
-- );
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

-- Change authentication method for the root user (or specify another user if needed)
ALTER USER 'root'@'%' IDENTIFIED WITH `mysql_native_password` BY 'rootpassword';

-- Flush privileges to ensure the changes take effect
FLUSH PRIVILEGES;

-- X-- **Insert sample data for `Users`**
-- INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`)
-- VALUES
--     ('john.doe@example.com', 'john_doe', 'password123', 1),
--     ('jane.smith@example.com', 'jane_smith', 'password123', 1),
--     ('mike.jones@example.com', 'mike_jones', 'password123', 1),
--     ('anna.lee@example.com', 'anna_lee', 'password123', 1),
--     ('lucas.green@example.com', 'lucas_green', 'password123', 1);

-- -- **Insert sample data for `SellerDetails`**
-- INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)
-- VALUES
--     (1, '123 Maple St', 'London', 'England', 'AB12 3CD', 'UK'),
--     (2, '456 Oak St', 'Manchester', 'Greater Manchester', 'M2 4DP', 'UK'),
--     (3, '789 Pine St', 'Birmingham', 'West Midlands', 'B1 1AA', 'UK');

-- -- **Insert sample data for `ItemCategory`**
-- INSERT INTO `ItemCategory` (`CategoryName`)
-- VALUES
--     ('Electronics'),
--     ('Clothing, Shoes & Accessories'),
--     ('Furniture & Home Decor'),
--     ('Groceries & Food'),
--     ('Collectibles & Art'),
--     ('Fitness & Outdoors'),
--     ('Vehicle Parts & Accessories'),
--     ('Books');

-- -- **Insert sample data for `Auctions`**
-- INSERT INTO `Auctions` (`SellerID`, `StartingPrice`, `ReservePrice`, `ImageURL`, `StartDate`, `EndDate`, `HighestBid`, `CategoryID`)
-- VALUES
--     (1, 100.00, 150.00, 'https://placehold.co/600x400', '2024-11-01 10:00:00', '2024-11-10 18:00:00', NULL, 1),
--     (2, 50.00, 75.00, 'https://placehold.co/600x400', '2024-11-02 11:00:00', '2024-11-15 19:00:00', NULL, 2),
--     (3, 200.00, 250.00, 'https://placehold.co/600x400', '2024-11-03 12:00:00', '2024-11-12 20:00:00', NULL, 3);    

-- -- **Insert sample data for `Bids`**
-- INSERT INTO `Bids` (`BidAmount`, `BidTime`, `BidderID`, `AuctionID`)
-- VALUES
--     (120.00, '2024-11-01 10:15:00', 4, 1),
--     (80.00, '2024-11-02 11:20:00', 5, 2),
--     (220.00, '2024-11-03 12:25:00', 3, 3);

-- -- **Insert sample data for `AuctionRatings`**
-- INSERT INTO `AuctionRatings` (`AuctionID`, `UserID`, `Rating`)
-- VALUES
--     - -- **Insert sample data for `Questions`**
-- INSERT INTO `Questions` (`AuctionID`, `BuyerID`, `QuestionText`)
-- VALUES
--     (1, 4, 'Is the product brand new?'),
--     (2, 5, 'Does this come with a warranty?'),
--     (3, 3, 'What color is this item?');

-- -- **Insert sample data for `Answers`**
-- INSERT INTO `Answers` (`QuestionID`, `SellerID`, `AnswerText`)
-- VALUES
--    

--  Add users of both profiles, buyer and seller
-- User 0
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
        VALUES ('sellerbuyer@example.com', 'sellerbuyer1990', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
        VALUES (
        (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer@example.com'),
        '999 Main Street2, Orange, CA 91234'
        );

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
        VALUES (
        (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer@example.com'), 
        '456 Elm Street', 'Austin', 'IL', '62704', 'USA'
        );


-- User 1
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
    VALUES ('user1@example.com', 'userone1991', 'securepassword1', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
    VALUES (
        (SELECT `UserID` FROM `Users` WHERE `Email` = 'user1@example.com'),
        '10 Downing Street, London, SW1A 2AA, UK'
    );

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user1@example.com'), 
    '221B Baker Street', 'London', 'Camden', 'NW1 6XE', 'UK'
);

-- User 2
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('user2@example.com', 'usertwo1992', 'securepassword2', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user2@example.com'),
    '32 London Bridge Street, London, SE1 9SG, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user2@example.com'), 
    '7 Savile Row', 'London', 'Kensington', 'W1S 3PE', 'UK'
);

-- User 3
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('user3@example.com', 'userthree1993', 'securepassword3', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user3@example.com'),
    '160 Old Street, London, EC1V 9BW, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user3@example.com'), 
    '50 Abbey Street', 'Keynsham', 'Bath', 'E1 6LT', 'UK'
);

-- User 4
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('user4@example.com', 'userfour1994', 'securepassword4', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user4@example.com'),
    '100 Victoria Embankment, London, EC4Y 0DY, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user4@example.com'), 
    '58 Castle Street', 'Radstock', 'Bath', 'EC3M 4AB', 'UK'
);

-- User 5
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('user5@example.com', 'userfive1995', 'securepassword5', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user5@example.com'),
    '1 Churchill Place, London, E14 5HP, UK'
);

INSERT INTO `SellerDetails` (`UserID`, `StreetAddress`, `City`, `StateProvince`, `PostalCode`, `Country`)  
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'user5@example.com'), 
    '25 Canada Square', 'London', 'Greater London', 'E14 5LB', 'UK'
);

-- User 6
INSERT INTO `Users` (`Email`, `Username`, `Password`, `StatusID`) 
VALUES ('onlybuyer@example.com', 'onlybuyer2000', 'secure', 1);

INSERT INTO `BuyerDetails` (`UserID`, `ShippingAddress`) 
VALUES (
    (SELECT `UserID` FROM `Users` WHERE `Email` = 'onlybuyer@example.com'),
    '1 Penny Lane Place, London, E11 5JP, UK'
);
--  Add auctions
-- Insert 10 items into the Auctions table
-- Insert 10 items into the Auctions table with starting dates as yesterday
-- INSERT INTO Auctions (SellerID, ItemName, ItemDescription, StartingPrice, ReservePrice, ImageURL, StartDate, EndDate, CategoryID) VALUES
--     (1, 'Antique Vase', 'A beautiful antique vase from the 19th century.', 50.00, 75.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 WEEK), 4), -- Collectibles
--     (2, 'Vintage Record Player', 'A classic record player in excellent condition.', 100.00, 150.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 WEEK), 1), -- Electronics
--     (3, 'Leather Jacket', 'A stylish leather jacket, barely used.', 75.00, 100.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 2), -- Fashion
--     (4, 'Rare Book Collection', 'A collection of rare books by various authors.', 200.00, 300.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 8), -- Books
--     (1, 'Handmade Wooden Table', 'A beautiful handmade wooden table with intricate carvings.', 300.00, 400.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 3), -- Home & Garden
--     (2, 'Antique Clock', 'A vintage clock in working condition.', 80.00, 120.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 4), -- Collectibles
--     (3, 'Designer Dress', 'A stunning designer dress, perfect for special occasions.', 150.00, 200.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 2), -- Fashion
--     (4, 'Original Painting', 'An original painting by a local artist.', 400.00, 500.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 WEEK), 4), -- Collectibles
--     (1, 'Set of Silverware', 'A complete set of silverware for 12 people.', 120.00, 180.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 5 WEEK), 3), -- Home & Garden
--     (2, 'Vintage Camera', 'A vintage camera in good condition with original case.', 60.00, 90.00, 'https://placehold.co/300x200', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 5 WEEK), 1); -- Electronics

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
