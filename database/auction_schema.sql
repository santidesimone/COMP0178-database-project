CREATE TABLE Bid (
    BidID INT(20) PRIMARY KEY,
    TransactionID INT(20),
    BidAmount INT(20),
    BidTime DATETIME,
    BuyerID INT(20),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID),
    FOREIGN KEY (BuyerID) REFERENCES Buyer(BuyerID)
);

-- RoleName not PK, can't be a FK
CREATE TABLE UserRole (
    UserRoleID INT(20) PRIMARY KEY,
    RoleName VARCHAR(50),
    UserID INT(20),
    RoleID INT(20),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE Buyer (
    BuyerID INT(20) PRIMARY KEY
);

CREATE TABLE Recommendation (
    RecommendationID INT(20) PRIMARY KEY,
    AuctionID INT(20),
    Buyer INT(20),
    FOREIGN KEY (AuctionID) REFERENCES Auction(AuctionID),
    FOREIGN KEY (Buyer) REFERENCES Buyer(BuyerID)
);

CREATE TABLE User (
    UserID INT(20) PRIMARY KEY,
    Username VARCHAR(320) NOT NULL,
    Email VARCHAR(320) NOT NULL,
    Password VARCHAR(20) NOT NULL,
    CreatedDate DATETIME NOT NULL,
    StatusID INT(20),
    FOREIGN KEY (StatusID) REFERENCES Status(StatusID)
);

CREATE TABLE Invite (
    InviteID INT(20) PRIMARY KEY,
    UserID INT(20),
    InviteCode INT(15),
    InvitedUserCount INT(20),
    DiscountGranted DECIMAL(12,1),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Status (
    StatusID INT(20) PRIMARY KEY,
    StatusName VARCHAR(50) NOT NULL
);

-- UsedVehicleID is not a PK
CREATE TABLE Question (
    QuestionID INT(20) PRIMARY KEY,
    AuctionID INT(20),
    UsedVehicleID INT(20),
    UserID INT(20),
    QuestionText TEXT,
    CreatedDate DATETIME,
    FOREIGN KEY (AuctionID) REFERENCES Auction(AuctionID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Auction (
    AuctionID INT(20) PRIMARY KEY,
    StartingPrice INT(10) NOT NULL,
    Category VARCHAR(5) NOT NULL,
    ReservePrice INT(10),
    SellerID INT(20),
    ImageURL VARCHAR(25),
    StartDate DATETIME,
    EndDate DATETIME,
    HighestBid INT(10),
    TransactionID INT(20),
    FOREIGN KEY (SellerID) REFERENCES Seller(SellerID),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID)
);

CREATE TABLE ShoppingCart (
    CartID INT(20) PRIMARY KEY,
    UserID INT(20),
    CreatedDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE CartItem (
    CartItemID INT(20) PRIMARY KEY,
    CartID INT(20),
    ItemID INT(20),
    Quantity INT(5),
    FOREIGN KEY (CartID) REFERENCES ShoppingCart(CartID)
);

CREATE TABLE Seller (
    SellerID INT(20) PRIMARY KEY
);

CREATE TABLE Answer (
    AnswerID INT(20) PRIMARY KEY,
    QuestionID INT(20),
    AnswerText TEXT,
    CreatedDate DATETIME,
    FOREIGN KEY (QuestionID) REFERENCES Question(QuestionID)
);

CREATE TABLE Transaction (
    TransactionID INT(12) PRIMARY KEY,
    AuctionID INT(20),
    BuyerID INT(20),
    SellerID INT(20),
    TransactionDate DATETIME,
    TransactionFee INT(5),
    FOREIGN KEY (AuctionID) REFERENCES Auction(AuctionID),
    FOREIGN KEY (BuyerID) REFERENCES Buyer(BuyerID),
    FOREIGN KEY (SellerID) REFERENCES Seller(SellerID)
);

CREATE TABLE SellerRating (
    RatingID INT(20) PRIMARY KEY,
    TransactionID INT(12),
    Rating INT(3),
    ReviewText TEXT,
    CreatedDate DATETIME,
    SellerID INT(20),
    FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID),
    FOREIGN KEY (SellerID) REFERENCES Seller(SellerID)
);

-- Table: Bid
-- Table: UserRole
-- Table: Buyer
-- Table: Recommendation
-- Table: User
-- Table: Invite
-- Table: Status
-- Table: Question
-- Table: Auction
-- Table: ShoppingCart
-- Table: CartItem
-- Table: Seller
-- Table: Answer
-- Table: Transaction
-- Table: SellerRating

-- 14 tables
