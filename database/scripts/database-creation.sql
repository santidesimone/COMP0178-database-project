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