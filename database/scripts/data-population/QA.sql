-- Questions and Answers for Auction 1 (Antique Vase)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (1, 7, 'Are there any cracks or chips in the vase?'),
    (1, 8, 'Can you provide more details about the vases origin and history?'),
    (1, 9, 'What are the dimensions of the vase?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (1, 1, 'The vase is in excellent condition with no visible cracks or chips.'),
    (2, 1, 'Unfortunately, we do not have detailed information about its origin and history.');

-- Questions and Answers for Auction 2 (Vintage Record Player)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (2, 6, 'Does the record player come with a needle?'),
    (2, 7, 'What speeds does it play?'),
    (2, 8, 'Are there any issues with the speakers or turntable?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (4, 2, 'Yes, the record player comes with a brand new needle.'),
    (5, 2, 'It plays at 33 1/3, 45, and 78 RPM.');


-- Questions and Answers for Auction 3 (Leather Jacket)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (3, 6, 'Is the leather genuine?'),
    (3, 7, 'What size is the jacket?'),
    (3, 8, 'What is the color of the jacket?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (7, 3, 'Yes, the jacket is made of genuine leather.'),
    (8, 3, 'The jacket is a size medium.');


-- Questions and Answers for Auction 4 (Rare Book Collection)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (4, 6, 'Can you list the titles included in the collection?'),
    (4, 7, 'What is the condition of the books?'),
    (4, 8, 'Are there any first editions?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (10, 4, 'A detailed list of titles can be provided upon request.'),
    (11, 4, 'The books are in good condition with minor wear and tear.');


-- Questions and Answers for Auction 5 (Handmade Wooden Table)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (5, 2, 'What type of wood is the table made of?'),
    (5, 3, 'What are the dimensions of the table?'),
    (5, 4, 'Is the table heavy?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (13, 1, 'The table is crafted from solid oak wood.'),
    (14, 1, 'The table measures 6 feet in length, 3 feet in width, and 30 inches in height.');


-- Questions and Answers for Auction 6 (Antique Clock)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (6, 1, 'Is the clock in working condition?'),
    (6, 3, 'What type of movement does the clock have?'),
    (6, 4, 'Can you provide details about the clocks maker or origin?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (16, 2, 'Yes, the clock is in working condition and keeps accurate time.'),
    (17, 2, 'The clock has a mechanical movement and requires winding.');


-- Questions and Answers for Auction 7 (Designer Dress)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (7, 1, 'What is the material of the dress?'),
    (7, 2, 'What are the measurements of the dress?'),
    (7, 4, 'Has the dress been altered in any way?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (19, 3, 'The dress is made of silk and lined with satin.'),
    (20, 3, 'The dress is a size 8 with a bust measurement of 36 inches, waist of 28 inches, and length of 40 inches.');


-- Questions and Answers for Auction 8 (Original Painting)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (8, 1, 'What are the dimensions of the painting?'),
    (8, 2, 'What type of paint was used?'),
    (8, 3, 'Is the painting framed?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (22, 4, 'The painting measures 24 inches by 36 inches.'),
    (23, 4, 'The painting was created using acrylic paints on canvas.');


-- Questions and Answers for Auction 9 (Set of Silverware)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (9, 2, 'What is the silverware made of?'),
    (9, 3, 'How many pieces are included in the set?'),
    (9, 4, 'Is the silverware dishwasher safe?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (25, 1, 'The silverware is made of high-quality stainless steel.'),
    (26, 1, 'The set includes 72 pieces: 12 dinner forks, 12 salad forks, 12 dinner knives, 12 dinner spoons, 12 teaspoons, and 12 serving pieces.');


-- Questions and Answers for Auction 10 (Vintage Camera)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (10, 1, 'What type of film does the camera use?'),
    (10, 3, 'Does the camera have any known issues?'),
    (10, 4, 'What is the shutter speed range?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (28, 2, 'The camera uses 35mm film.'),
    (29, 2, 'The camera is in good working condition with no known issues.');


-- Questions and Answers for Auction 11 (Bluetooth Headphones)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (11, 2, 'What is the battery life of the headphones?'),
    (11, 3, 'What is the range of the Bluetooth connection?'),
    (11, 4, 'Do the headphones come with a warranty?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (31, 1, 'The headphones have a battery life of up to 20 hours on a single charge.'),
    (32, 1, 'The Bluetooth connection has a range of up to 30 feet.');


-- Questions and Answers for Auction 12 (Sports Watch)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (12, 1, 'Is the watch water resistant?'),
    (12, 3, 'What features does the watch have?'),
    (12, 4, 'What is the band made of?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (34, 2, 'Yes, the watch is water resistant up to 50 meters.'),
    (35, 2, 'The watch features a stopwatch, timer, alarm, and heart rate monitor.');


-- Questions and Answers for Auction 13 (Vintage Denim Jacket)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (13, 1, 'What is the size of the jacket?'),
    (13, 2, 'What is the condition of the denim?'),
    (13, 4, 'Are there any rips or tears in the jacket?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (37, 3, 'The jacket is a size large.'),
    (38, 3, 'The denim is in good condition with some fading and wear consistent with its age.');


-- Questions and Answers for Auction 14 (Gardening Set)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (14, 1, 'What tools are included in the set?'),
    (14, 2, 'What size are the gloves?'),
    (14, 3, 'What material are the pots made of?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (40, 4, 'The set includes a trowel, hand rake, cultivator, and pruning shears.'),
    (41, 4, 'The gloves are a size medium.');


-- Questions and Answers for Auction 15 (Electric Scooter)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (15, 1, 'What is the top speed of the scooter?'),
    (15, 3, 'How long does it take to fully charge the battery?'),
    (15, 4, 'What is the weight limit for the scooter?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (43, 2, 'The scooter has a top speed of 15 mph.'),
    (44, 2, 'It takes approximately 4 hours to fully charge the battery.');


-- Questions and Answers for Auction 16 (Car Dashboard Camera)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (16, 1, 'Does the camera have a built-in GPS?'),
    (16, 3, 'What is the video resolution?'),
    (16, 4, 'Does the camera have a parking mode?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (46, 2, 'Yes, the camera has a built-in GPS for location tracking.'),
    (47, 2, 'The camera records video in 1080p resolution.');


-- Questions and Answers for Auction 17 (Board Game Set)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (17, 1, 'Which board games are included in the set?'),
    (17, 2, 'What is the condition of the games?'),
    (17, 3, 'Are all the pieces and instructions included?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (49, 5, 'The set includes Monopoly, Scrabble, Clue, and Risk.'),
    (50, 5, 'The games are in good condition with all pieces and instructions included.');


-- Questions and Answers for Auction 18 (Yoga Mat)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (18, 1, 'What is the thickness of the mat?'),
    (18, 2, 'What is the material of the mat?'),
    (18, 4, 'What is the length and width of the mat?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (52, 3, 'The mat is 1/4 inch thick.'),
    (53, 3, 'The mat is made of eco-friendly PVC material.');


-- Questions and Answers for Auction 19 (Classic Car Model)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (19, 1, 'What is the scale of the model?'),
    (19, 2, 'What is the make and model of the car?'),
    (19, 3, 'What is the condition of the model?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (55, 4, 'The model is 1:18 scale.'),
    (56, 4, 'The model is a 1967 Ford Mustang Shelby GT500.');


-- Questions and Answers for Auction 20 (Novel Collection)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (20, 1, 'Which novels are included in the collection?'),
    (20, 2, 'What is the condition of the books?'),
    (20, 3, 'Are any of the books signed by the author?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (58, 4, 'The collection includes "To Kill a Mockingbird", "Pride and Prejudice", and "The Great Gatsby".'),
    (59, 4, 'The books are in good condition with minimal wear and tear.');


-- Questions and Answers for Auction 21 (IKEA Wooden Table)
INSERT INTO `Questions` (`AuctionID`, `UserID`, `QuestionText`) VALUES
    (21, 1, 'What type of wood is the table made of?'),
    (21, 3, 'What are the dimensions of the table?'),
    (21, 4, 'Does the table come with assembly instructions?');

INSERT INTO `Answers` (`QuestionID`, `UserID`, `AnswerText`) VALUES
    (61, 2, 'The table is made of solid pine wood.'),
    (62, 2, 'The table measures 74 inches in length, 39 inches in width, and 29 inches in height.');

-- Since Auction 22 is closed, no questions or answers are added for it.