--  Adding auctions
INSERT INTO `Auctions` (`SellerID`, `ItemName`, `ItemDescription`, `StartingPrice`, `ReservePrice`, `WinnerPrice`, `ImageURL`, `StartDate`, `EndDate`, `CategoryID`) VALUES
    (1, 'Antique Vase', 'A beautiful antique vase from the 19th century.', 50.00, 65.00, 75.00, 'https://i.ibb.co/BGgHZ3t/1.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 20 WEEK), 4), -- Collectibles
    (2, 'Vintage Record Player', 'A classic record player in excellent condition.', 100.00, 115.00, 150.00, 'https://bit.ly/vintage-record-player-1', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 WEEK), 1), -- Electronics
    (3, 'Leather Jacket', 'A stylish leather jacket, barely used.', 75.00, 90.00, 100.00, 'https://bit.ly/leather-jacket-1', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 2), -- Fashion
    (4, 'Rare Book Collection', 'A collection of rare books by various authors.', 200.00, 215.00, 300.00, 'https://i.ibb.co/Yfdshh5/4.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 30 WEEK), 8), -- Books
    (1, 'Handmade Wooden Table', 'A beautiful handmade wooden table with intricate carvings.', 300.00, 315.00, 400.00, 'https://i.ibb.co/tYdY13W/5.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 3), -- Home & Garden
    (2, 'Antique Clock', 'A vintage clock in working condition.', 80.00, 95.00, 120.00, 'https://i.ibb.co/0KxxRW1/7.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 4), -- Collectibles
    (3, 'Designer Dress', 'A stunning designer dress, perfect for special occasions.', 150.00, 165.00, 200.00, 'https://i.ibb.co/qrtMGZy/8.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 6 WEEK), 2), -- Fashion
    (4, 'Original Painting', 'An original painting by a local artist.', 400.00, 415.00, 500.00, 'https://i.ibb.co/N9crM5K/9.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 WEEK), 4), -- Collectibles
    (1, 'Set of Silverware', 'A complete set of silverware for 12 people.', 120.00, 135.00, 180.00, 'https://i.ibb.co/XWv3nF3/10.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 5 WEEK), 3), -- Home & Garden
    (2, 'Vintage Camera', 'A vintage camera in good condition with original case.', 60.00, 75.00, 90.00, 'https://i.ibb.co/Dp0dCYY/11.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 5 WEEK), 1), -- Electronics
    (1, 'Bluetooth Headphones', 'High-quality wireless Bluetooth headphones with noise-canceling feature.', 50.00, 65.00, 80.00, 'https://i.ibb.co/wWSk8Rs/12.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 10 WEEK), 1), -- Electronics
    (2, 'Sports Watch', 'A durable and stylish sports watch with multiple features.', 40.00, 55.00, 70.00, 'https://i.ibb.co/cCCT1bJ/13.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 WEEK), 6), -- Sports & Outdoors
    (3, 'Vintage Denim Jacket', 'A classic vintage denim jacket in great condition.', 55.00, 70.00, 90.00, 'https://i.ibb.co/4V7mLTH/14.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 2), -- Fashion
    (4, 'Gardening Set', 'A complete gardening set including tools, gloves, and pots.', 25.00, 40.00, 45.00, 'https://i.ibb.co/0Q4k1Kd/15.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 WEEK), 3), -- Home & Garden
    (2, 'Electric Scooter', 'A foldable electric scooter with a 10-mile range and fast charging.', 150.00, 165.00, 220.00, 'https://i.ibb.co/r09zY1p/16.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 6), -- Sports & Outdoors
    (2, 'Car Dashboard Camera', 'A high-definition dashboard camera for your car, with night vision.', 60.00, 75.00, 100.00, 'https://i.ibb.co/LJLTYzm/17.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 7), -- Automotive
    (5, 'Board Game Set', 'A collection of classic board games, perfect for family nights.', 30.00, 45.00, 50.00, 'https://i.ibb.co/drP5x4k/18.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 WEEK), 5), -- Toys & Hobbies
    (3, 'Yoga Mat', 'A high-quality, non-slip yoga mat for all fitness levels.', 20.00, 35.00, 35.00, 'https://i.ibb.co/7Ns4rRm/19.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 WEEK), 8), -- Sports & Outdoors
    (4, 'Classic Car Model', 'A detailed 1:18 scale model of a classic car, limited edition.', 80.00, 95.00, 120.00, 'https://i.ibb.co/KLNCt0h/20.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 WEEK), 4), -- Collectibles
    (4, 'Novel Collection', 'A set of contemporary novels by best-selling authors.', 40.00, 55.00, 70.00, 'https://i.ibb.co/w7Q1TtZ/21.webp', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 15 WEEK), 8), -- Books
    (2, 'IKEA Wooden Table', 'IKEA wooden table.', 300.00, 315.00, 400.00, 'https://i.ibb.co/23h1MkQ/Screenshot-2024-11-16-at-3-59-38-PM.png', DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 14 WEEK), 3); -- Home & Garden



-- 1. Insert the auction with AuctionStatusID = 2 and ReservePrice
INSERT INTO `Auctions` 
    (`SellerID`, `ItemName`, `ItemDescription`, `StartingPrice`, `WinnerPrice`, `ImageURL`, `StartDate`, `EndDate`, `CategoryID`, `AuctionStatusID`, `ReservePrice`) -- Include ReservePrice
SELECT 
    (SELECT `SellerID` FROM `SellerDetails` WHERE `UserID` = 1),  
    'iPhone 12 Phone Case', 
    'Protective and stylish phone case for iPhone 12. Excellent condition.', 
    5.00, 
    20.00, 
    'https://i.ibb.co/bdwkSGn/Screenshot-2024-11-20-at-6-19-04-PM.png', 
    DATE_SUB(CURDATE(), INTERVAL 2 MONTH),  
    DATE_SUB(CURDATE(), INTERVAL 1 WEEK), 
    1,  
    2,  -- Set AuctionStatusID to 2 (closed)
    10;  
