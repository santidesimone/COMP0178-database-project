-- CREATE DATABASE IF NOT EXISTS ucl;
-- USE ucl;

-- CREATE TABLE IF NOT EXISTS students (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Change authentication method for the root user (or specify another user if needed)
-- ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'rootpassword';

-- -- Flush privileges to ensure the changes take effect
-- FLUSH PRIVILEGES;

-- -- Insert three students into the students table
-- INSERT INTO students (name, email) VALUES 
-- ('Santiago De Simone', 'sds@example.com'),
-- ('Jianian Zheng', 'jz@example.com'),
-- ('Gavin Hor', 'gh@example.com'),
-- ('Bingfan Xu', 'bx@example.com');

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
    `User_ID` INT AUTO_INCREMENT PRIMARY KEY,
    `Email` VARCHAR(100) NOT NULL UNIQUE,
    `CreatedDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Username` VARCHAR(100) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `StatusID` INT NOT NULL,
    FOREIGN KEY (`StatusID`) REFERENCES `UserStatus`(`StatusID`)
);

-- 3. Create the `BuyerDetails` Table
CREATE TABLE `BuyerDetails` (
    `BuyerID` INT PRIMARY KEY,
    `UserID` INT NOT NULL,
    `ShippingAddress` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`UserID`) REFERENCES `Users`(`User_ID`)
);

-- 4. Create the `SellerDetails` Table
CREATE TABLE `SellerDetails` (
    `SellerID` INT PRIMARY KEY,
    `UserID` INT NOT NULL,
    `StreetAddress` VARCHAR(255),
    `City` VARCHAR(100),
    `StateProvince` VARCHAR(100),
    `PostalCode` VARCHAR(20),
    `Country` VARCHAR(100),
    FOREIGN KEY (`UserID`) REFERENCES `Users`(`User_ID`)
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
CREATE TABLE `Auctions` (
    `AuctionID` INT AUTO_INCREMENT PRIMARY KEY,
    `SellerID` INT NOT NULL,
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
    FOREIGN KEY (`UserID`) REFERENCES `Users`(`User_ID`)
);

-- 9. Create the `Questions` Table
CREATE TABLE `Questions` (
    `QuestionID` INT AUTO_INCREMENT PRIMARY KEY,
    `AuctionID` INT NOT NULL,
    `BuyerID` INT NOT NULL,
    `QuestionText` TEXT NOT NULL,
    `QuestionDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`AuctionID`) REFERENCES `Auctions`(`AuctionID`),
    FOREIGN KEY (`BuyerID`) REFERENCES `Users`(`User_ID`)
);

-- 10. Create the `Answers` Table
CREATE TABLE `Answers` (
    `AnswerID` INT AUTO_INCREMENT PRIMARY KEY,
    `QuestionID` INT NOT NULL,
    `SellerID` INT NOT NULL,
    `AnswerText` TEXT NOT NULL,
    `AnswerDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`QuestionID`) REFERENCES `Questions`(`QuestionID`),
    FOREIGN KEY (`SellerID`) REFERENCES `Users`(`User_ID`)
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
--     (1, 4, 4),
--     (2, 5, 5),
--     (3, 3, 3);

-- -- **Insert sample data for `Questions`**
-- INSERT INTO `Questions` (`AuctionID`, `BuyerID`, `QuestionText`)
-- VALUES
--     (1, 4, 'Is the product brand new?'),
--     (2, 5, 'Does this come with a warranty?'),
--     (3, 3, 'What color is this item?');

-- -- **Insert sample data for `Answers`**
-- INSERT INTO `Answers` (`QuestionID`, `SellerID`, `AnswerText`)
-- VALUES
--    
