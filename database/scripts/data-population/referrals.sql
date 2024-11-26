-- Insert Referral for User 4 (who referred by User 3)
INSERT INTO `Referrals` (`ReferrerCode`, `ReferredUserID`) 
VALUES ('778a742df5', (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0004@example.com'));

-- Insert Referral for User 5 (who referred by User 3)
INSERT INTO `Referrals` (`ReferrerCode`, `ReferredUserID`) 
VALUES ('778a742df5', (SELECT `UserID` FROM `Users` WHERE `Email` = 'sellerbuyer0005@example.com'));