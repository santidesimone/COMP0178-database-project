
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