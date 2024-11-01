// routes/index.js
const express = require('express');
// const studentsRoutes = require('./students'); // Import the students routes
const loginRoutes = require('./login'); // Import the login routes
const signinRoutes = require('./signin'); // Import the signin routes
const auctionRoutes = require('./auctions'); // Import the auction routes
const bidsRoutes = require('./bids'); // Import the auction routes
const recommendationsRoutes = require('./recommendations'); // Import the auction routes
const itemsRoutes = require('./items'); // Import the auction routes
const watchlistRoutes = require('./watchlist'); // Import the auction routes

const router = express.Router();

// Core Functionality 

// 1
// Users can register with the system and create accounts.
// Users have roles of seller or buyer with different privileges.
router.use('/login', loginRoutes);
router.use('/signin', signinRoutes);
    // how do we need to ensure that a user can only see its own data? 


// Having separate entities for item and auction in your ER diagram can be valid, especially if each entity has distinct attributes or serves a different purpose in your application. Even if an item is created only when an auction is created, there are cases where keeping them separate offers flexibility and clarity. Here are some considerations:
// Attributes Specific to Each Entity: If the item has unique attributes (e.g., item description, category, or initial condition) that aren’t directly related to the auction entity (like auction end date or starting bid), then keeping them as separate entities will help avoid unnecessary complexity.
// Future Use Cases: Separating item and auction allows for potential scenarios where items exist independently of auctions. For instance, you may want to manage items before deciding to auction them, or in the future, you might allow items to be reused across multiple auctions.
// Clear Relationships: A separation can help clarify relationships between entities in your system. For example, if auction has a foreign key reference to item, it clearly indicates that each auction involves a specific item without conflating the two concepts.
// If the item really has no purpose outside of being auctioned, you might alternatively define item as a dependent entity (or a weak entity) of auction. This structure reinforces that an item exists only within the context of its auction but still allows for flexibility if you decide to expand functionality in the future.

// 2
// Sellers can create auctions for particular items, setting suitable
// conditions and features of the items including the item
// description, categorisation, starting price, reserve price and
// end date.
// &
// 3
// Buyers can search the system for particular kinds of item
// being auctioned and can browse and visually re-arrange
// listings of items within categories.

router.use('/auctions', auctionRoutes);
    // by category
    // by date
    // by matching keywords in title

router.use('/items', itemsRoutes);
    
// 4
// Buyers can bid for items 
// Buyers can see the bids other users make as they are received. 
// The system will manage the auction until the set end time and award the item to the highest bidder. 
// The system should confirm to both the winner and seller of an auction its outcome.
router.use('/bids', bidsRoutes);

// (+E5 - // Buyers can receive emailed updates on bids on those items, including notifications when they are outbid) 




// router.use('/transactions', Routes); 
    // transaction
        // by item id
        // by user id 



        
// ********

// Extra functionality related to core features requiring usage of
// a database.
// E1, E2, E3, E4

// E1 - INVITATION LINK
// router.use('/user/invites', Routes); 
    // by user id 

// E2 - 
// router.use('/user/rating', Routes); 
    // by user id 

// E3 - RATING
// router.use('/qa', Routes); 
    // by item id
    // by user id

// E4 - Q&A
// router.use('/shopping-cart', Routes); 
    // by user id


// E5 - 
// Buyers can watch auctions on items and receive emailed
// updates on bids on those items including notifications when
// they are outbid.
router.use('/watchlist', watchlistRoutes); 
    // by user id


// E6 -
// Buyers can receive recommendations for items to bid on
// based on collaborative filtering (i.e., ‘you might want to bid on
// the sorts of things other people, who have also bid on the
// sorts of things you have previously bid on, are currently
// bidding on).
router.use('/recommendations', recommendationsRoutes); 
    // by user id


// buyer
// user 
// shoppingCart
// invites
// cartItem

module.exports = router;


// router.use('/user/info', Routes); 
    // by user id 