-- -----------------------------------------------------
-- Schema auction_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `auction_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `auction_db`;

-- -----------------------------------------------------
-- Table `Seller`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Seller` (
  `User_UserID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `StatusID` INT(20) NOT NULL,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ContactInfo` VARCHAR(255),
  `LastLoginDate` DATETIME,
  PRIMARY KEY (`User_UserID`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC),
  INDEX `idx_seller_status` (`StatusID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Buyer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Buyer` (
  `User_UserID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `StatusID` INT(20) NOT NULL,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ShippingAddress` TEXT,
  `LastLoginDate` DATETIME,
  PRIMARY KEY (`User_UserID`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC),
  INDEX `idx_buyer_status` (`StatusID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Auction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Auction` (
  `AuctionID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Seller_User_UserID` INT(20) UNSIGNED NOT NULL,
  `Title` VARCHAR(255) NOT NULL,
  `Description` TEXT,
  `StartingPrice` DECIMAL(10,2) UNSIGNED NOT NULL,
  `ReservePrice` DECIMAL(10,2) UNSIGNED NOT NULL,
  `CurrentBid` DECIMAL(10,2) UNSIGNED,
  `Category` VARCHAR(50) NOT NULL,
  `ImageURL` VARCHAR(255),
  `StartDate` DATETIME NOT NULL,
  `EndDate` DATETIME NOT NULL,
  `Status` ENUM('active', 'ended', 'cancelled') NOT NULL DEFAULT 'active',
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`AuctionID`),
  INDEX `fk_Auction_Seller_idx` (`Seller_User_UserID` ASC),
  INDEX `idx_auction_status` (`Status`, `EndDate`),
  INDEX `idx_auction_category` (`Category`),
  CONSTRAINT `fk_Auction_Seller`
    FOREIGN KEY (`Seller_User_UserID`)
    REFERENCES `Seller` (`User_UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `ShoppingCart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ShoppingCart` (
  `CartID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Buyer_User_UserID` INT(20) UNSIGNED NOT NULL,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CartID`),
  INDEX `fk_ShoppingCart_Buyer_idx` (`Buyer_User_UserID` ASC),
  CONSTRAINT `fk_ShoppingCart_Buyer`
    FOREIGN KEY (`Buyer_User_UserID`)
    REFERENCES `Buyer` (`User_UserID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `CartItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CartItem` (
  `CartItemID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CartID` INT(20) UNSIGNED NOT NULL,
  `AuctionID` INT(20) UNSIGNED NOT NULL,
  `AddedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CartItemID`),
  UNIQUE INDEX `unique_cart_auction` (`CartID`, `AuctionID`),
  INDEX `fk_CartItem_Auction_idx` (`AuctionID` ASC),
  CONSTRAINT `fk_CartItem_Cart`
    FOREIGN KEY (`CartID`)
    REFERENCES `ShoppingCart` (`CartID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_CartItem_Auction`
    FOREIGN KEY (`AuctionID`)
    REFERENCES `Auction` (`AuctionID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Bid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bid` (
  `BidID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Auction_AuctionID` INT(20) UNSIGNED NOT NULL,
  `Buyer_User_UserID` INT(20) UNSIGNED NOT NULL,
  `BidAmount` DECIMAL(10,2) UNSIGNED NOT NULL,
  `BidTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`BidID`),
  INDEX `fk_Bid_Auction_idx` (`Auction_AuctionID` ASC),
  INDEX `fk_Bid_Buyer_idx` (`Buyer_User_UserID` ASC),
  INDEX `idx_bid_amount_time` (`BidAmount`, `BidTime`),
  CONSTRAINT `fk_Bid_Auction`
    FOREIGN KEY (`Auction_AuctionID`)
    REFERENCES `Auction` (`AuctionID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Bid_Buyer`
    FOREIGN KEY (`Buyer_User_UserID`)
    REFERENCES `Buyer` (`User_UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rating` (
  `RatingID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `AuctionID` INT(20) UNSIGNED NOT NULL,
  `BuyerID` INT(20) UNSIGNED NOT NULL,
  `SellerID` INT(20) UNSIGNED NOT NULL,
  `RatingValue` INT(3) UNSIGNED NOT NULL,
  `ReviewText` TEXT,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`RatingID`),
  UNIQUE INDEX `unique_auction_rating` (`AuctionID`, `BuyerID`, `SellerID`),
  INDEX `fk_Rating_Buyer_idx` (`BuyerID` ASC),
  INDEX `fk_Rating_Seller_idx` (`SellerID` ASC),
  CONSTRAINT `check_rating_value` 
    CHECK (`RatingValue` BETWEEN 1 AND 5),
  CONSTRAINT `fk_Rating_Auction`
    FOREIGN KEY (`AuctionID`)
    REFERENCES `Auction` (`AuctionID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Rating_Buyer`
    FOREIGN KEY (`BuyerID`)
    REFERENCES `Buyer` (`User_UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Rating_Seller`
    FOREIGN KEY (`SellerID`)
    REFERENCES `Seller` (`User_UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Question` (
  `QuestionID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `AuctionID` INT(20) UNSIGNED NOT NULL,
  `AskedByUserID` INT(20) UNSIGNED NOT NULL,
  `QuestionText` TEXT NOT NULL,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`QuestionID`),
  INDEX `fk_Question_Auction_idx` (`AuctionID` ASC),
  INDEX `fk_Question_User_idx` (`AskedByUserID` ASC),
  CONSTRAINT `fk_Question_Auction`
    FOREIGN KEY (`AuctionID`)
    REFERENCES `Auction` (`AuctionID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Question_User`
    FOREIGN KEY (`AskedByUserID`)
    REFERENCES `Buyer` (`User_UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Answer` (
  `AnswerID` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `QuestionID` INT(20) UNSIGNED NOT NULL,
  `AnsweredByUserID` INT(20) UNSIGNED NOT NULL,
  `AnswerText` TEXT NOT NULL,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`AnswerID`),
  INDEX `fk_Answer_Question_idx` (`QuestionID` ASC),
  INDEX `fk_Answer_User_idx` (`AnsweredByUserID` ASC),
  CONSTRAINT `fk_Answer_Question`
    FOREIGN KEY (`QuestionID`)
    REFERENCES `Question` (`QuestionID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Answer_User`
    FOREIGN KEY (`AnsweredByUserID`)
    REFERENCES `Seller` (`User_UserID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Add triggers
-- -----------------------------------------------------
DELIMITER //

-- Ensure EndDate is after StartDate
CREATE TRIGGER before_auction_insert 
BEFORE INSERT ON Auction
FOR EACH ROW
BEGIN
    IF NEW.EndDate <= NEW.StartDate THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'End date must be after start date';
    END IF;
END//

-- Update CurrentBid when new bid is placed
CREATE TRIGGER after_bid_insert
AFTER INSERT ON Bid
FOR EACH ROW
BEGIN
    UPDATE Auction 
    SET CurrentBid = NEW.BidAmount
    WHERE AuctionID = NEW.Auction_AuctionID 
    AND (CurrentBid IS NULL OR NEW.BidAmount > CurrentBid);
END//

-- Ensure new bid is higher than current bid
CREATE TRIGGER before_bid_insert
BEFORE INSERT ON Bid
FOR EACH ROW
BEGIN
    DECLARE current_bid DECIMAL(10,2);
    SELECT CurrentBid INTO current_bid
    FROM Auction
    WHERE AuctionID = NEW.Auction_AuctionID;
    
    IF current_bid IS NOT NULL AND NEW.BidAmount <= current_bid THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bid must be higher than current bid';
    END IF;
END//

-- Auto-update auction status
CREATE TRIGGER check_auction_end_date
BEFORE UPDATE ON Auction
FOR EACH ROW
BEGIN
    IF NEW.EndDate <= NOW() AND NEW.Status = 'active' THEN
        SET NEW.Status = 'ended';
    END IF;
END//

-- Prevent bids on ended auctions
CREATE TRIGGER before_bid_check_auction
BEFORE INSERT ON Bid
FOR EACH ROW
BEGIN
    DECLARE auction_status VARCHAR(10);
    SELECT Status 
    INTO auction_status
    FROM Auction
    WHERE AuctionID = NEW.Auction_AuctionID;
    
    IF auction_status != 'active' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot bid on inactive or ended auctions';
    END IF;
END//

DELIMITER ;