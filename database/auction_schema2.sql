-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `UserID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(50) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Role` ENUM('buyer', 'seller', 'both') NOT NULL,
  `Status` ENUM('active', 'suspended', 'banned') NOT NULL DEFAULT 'active',
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastLoginDate` DATETIME,
  `NotificationPreference` JSON, -- Stores notification settings
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `Username_UNIQUE` (`Username`),
  UNIQUE INDEX `Email_UNIQUE` (`Email`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Category` (
  `CategoryID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ParentCategoryID` INT UNSIGNED,
  `Name` VARCHAR(50) NOT NULL,
  `DisplayOrder` INT NOT NULL DEFAULT 0,
  `Level` INT NOT NULL, -- For hierarchy level tracking
  `Path` VARCHAR(255), -- Stores full category path for easy navigation
  PRIMARY KEY (`CategoryID`),
  INDEX `fk_Category_Parent_idx` (`ParentCategoryID`),
  INDEX `idx_category_path` (`Path`),
  CONSTRAINT `fk_Category_Parent`
    FOREIGN KEY (`ParentCategoryID`)
    REFERENCES `Category` (`CategoryID`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Auction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Auction` (
  `AuctionID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(255) NOT NULL,
  `Description` TEXT,
  `StartingPrice` DECIMAL(10,2) NOT NULL,
  `ReservePrice` DECIMAL(10,2) NOT NULL,
  `CurrentBid` DECIMAL(10,2),
  `CategoryID` INT UNSIGNED NOT NULL,
  `SellerID` INT UNSIGNED NOT NULL,
  `WinnerID` INT UNSIGNED, -- Track winner directly
  `ImageURL` VARCHAR(255),
  `Status` ENUM('draft', 'active', 'ended', 'cancelled') NOT NULL DEFAULT 'draft',
  `StartDate` DATETIME NOT NULL,
  `EndDate` DATETIME NOT NULL,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ViewCount` INT UNSIGNED DEFAULT 0, -- For popularity tracking
  `BidCount` INT UNSIGNED DEFAULT 0, -- For activity tracking
  `LastBidDate` DATETIME, -- For quick reference
  `NotificationsSent` JSON, -- Track notification status
  PRIMARY KEY (`AuctionID`),
  INDEX `fk_Auction_Seller_idx` (`SellerID`),
  INDEX `fk_Auction_Category_idx` (`CategoryID`),
  INDEX `idx_auction_status_date` (`Status`, `EndDate`),
  INDEX `idx_auction_search` (`Title`, `Status`, `EndDate`),
  FULLTEXT INDEX `idx_auction_fulltext` (`Title`, `Description`),
  CONSTRAINT `fk_Auction_Seller`
    FOREIGN KEY (`SellerID`)
    REFERENCES `User` (`UserID`),
  CONSTRAINT `fk_Auction_Category`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `Category` (`CategoryID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Bid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bid` (
  `BidID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `AuctionID` INT UNSIGNED NOT NULL,
  `BidderID` INT UNSIGNED NOT NULL,
  `BidAmount` DECIMAL(10,2) NOT NULL,
  `BidTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Status` ENUM('active', 'outbid', 'won', 'lost') NOT NULL DEFAULT 'active',
  `AutoBidEnabled` BOOLEAN DEFAULT FALSE,
  `MaxAutoBidAmount` DECIMAL(10,2), -- For automatic bidding
  `NotificationSent` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`BidID`),
  INDEX `fk_Bid_Auction_idx` (`AuctionID`),
  INDEX `fk_Bid_User_idx` (`BidderID`),
  INDEX `idx_bid_amount_time` (`AuctionID`, `BidAmount` DESC, `BidTime` DESC),
  CONSTRAINT `fk_Bid_User`
    FOREIGN KEY (`BidderID`)
    REFERENCES `User` (`UserID`),
  CONSTRAINT `fk_Bid_Auction`
    FOREIGN KEY (`AuctionID`)
    REFERENCES `Auction` (`AuctionID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `ShoppingCart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ShoppingCart` (
  `CartID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserID` INT UNSIGNED NOT NULL,
  `AuctionID` INT UNSIGNED NOT NULL,
  `NotifyOnBid` BOOLEAN DEFAULT TRUE,
  `NotifyBeforeEnd` BOOLEAN DEFAULT TRUE,
  `PriceThreshold` DECIMAL(10,2), -- Notify when price reaches this
  `EndingSoon` BOOLEAN DEFAULT FALSE, -- Flag for ending soon
  `AddedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PreferenceScore` INT DEFAULT 0, -- For recommendation system
  PRIMARY KEY (`CartID`),
  UNIQUE INDEX `unique_cart` (`UserID`, `AuctionID`),
  INDEX `idx_cart_preferences` (`UserID`, `PreferenceScore`),
  CONSTRAINT `fk_Cart_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `User` (`UserID`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_Cart_Auction`
    FOREIGN KEY (`AuctionID`)
    REFERENCES `Auction` (`AuctionID`)
    ON DELETE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Question` (
  `QuestionID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `AuctionID` INT UNSIGNED NOT NULL,
  `AskerID` INT UNSIGNED NOT NULL,
  `QuestionText` TEXT NOT NULL,
  `Status` ENUM('pending', 'answered', 'archived') NOT NULL DEFAULT 'pending',
  `IsPublic` BOOLEAN DEFAULT TRUE,
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Helpful` INT DEFAULT 0, -- Track helpful votes
  PRIMARY KEY (`QuestionID`),
  INDEX `fk_Question_Auction_idx` (`AuctionID`),
  INDEX `fk_Question_User_idx` (`AskerID`),
  FULLTEXT INDEX `idx_question_search` (`QuestionText`),
  CONSTRAINT `fk_Question_Auction`
    FOREIGN KEY (`AuctionID`)
    REFERENCES `Auction` (`AuctionID`),
  CONSTRAINT `fk_Question_User`
    FOREIGN KEY (`AskerID`)
    REFERENCES `User` (`UserID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Answer` (
  `AnswerID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `QuestionID` INT UNSIGNED NOT NULL,
  `AnswererID` INT UNSIGNED NOT NULL,
  `AnswerText` TEXT NOT NULL,
  `IsOfficial` BOOLEAN DEFAULT FALSE, -- Marks seller's official response
  `Helpful` INT DEFAULT 0, -- Track helpful votes
  `CreatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`AnswerID`),
  INDEX `fk_Answer_Question_idx` (`QuestionID`),
  INDEX `fk_Answer_User_idx` (`AnswererID`),
  CONSTRAINT `fk_Answer_Question`
    FOREIGN KEY (`QuestionID`)
    REFERENCES `Question` (`QuestionID`),
  CONSTRAINT `fk_Answer_User`
    FOREIGN KEY (`AnswererID`)
    REFERENCES `User` (`UserID`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rating` (
  `RatingID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `AuctionID` INT UNSIGNED NOT NULL,
  `FromUserID` INT UNSIGNED NOT NULL,
  `ToUserID` INT UNSIGNED NOT NULL,
  `RatingValue` INT NOT NULL,
  `ReviewText` TEXT,
  `RatingType` ENUM('buyer_to_seller', 'seller_to_buyer') NOT NULL,
  `Criteria` JSON, -- Stores detailed rating criteria
  `TransactionDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ReviewDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Helpful` INT DEFAULT 0,
  PRIMARY KEY (`RatingID`),
  UNIQUE INDEX `unique_transaction_rating` (`AuctionID`, `FromUserID`, `ToUserID`),
  INDEX `idx_rating_user_from` (`FromUserID`),
  INDEX `idx_rating_user_to` (`ToUserID`),
  CONSTRAINT `check_rating_value` 
    CHECK (`RatingValue` BETWEEN 1 AND 5),
  CONSTRAINT `fk_Rating_From`
    FOREIGN KEY (`FromUserID`)
    REFERENCES `User` (`UserID`),
  CONSTRAINT `fk_Rating_To`
    FOREIGN KEY (`ToUserID`)
    REFERENCES `User` (`UserID`),
  CONSTRAINT `fk_Rating_Auction`
    FOREIGN KEY (`AuctionID`)
    REFERENCES `Auction` (`AuctionID`)
) ENGINE = InnoDB;