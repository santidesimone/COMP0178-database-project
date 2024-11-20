import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionComponent } from './../session.component'; // Adjust the path if needed

 


@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe, 
    NgFor, 
    NgIf
  ],  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css'] // Corrected from styleUrl to styleUrls
})
export class AuctionDetailComponent implements OnInit {
  auctionID: string | null = null;
  auction: any;
  data: any;
  bids: any;
  offerAmount: number = 0; // To store the offer amount

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder, 
      private http: HttpClient, 
      private router: Router,
      private sessionComponent: SessionComponent, 

    ) {

// Buyers can bid for items 
    // ==> Just update Bids table with corresponding parameters: BidAmount, BidderID, AuctionID
    
    // We already have the auction's StartingPrice in the frontend. However, for extra security, we designed the query for creating a new Bid so that it will only insert a new bid into the Bids table if the condition Auction.StartingPrice <= BidAmount is satisfied.


// Buyers see the bids other users make as they are received 
    // ==> Get all bids on Auctions I made a bid for
            // Shall I communicate through email? I don't think it's "core functionality"
                // How will the buyer be able to "see the bids other users make as they are received"?


// The system will manage the auction until the set end time and award the item to the highest bidder.
    // ==> Get all bids [that loggued user made a bid on] that are due [either for endTime reached, or reservePrice met]

    // We considered adding an AuctionStatusID to the Auctions table, but decided against it. While it could help us easily query active auctions, we realized we can already figure out which auctions are active by checking if the endDate hasn’t passed and if there are no bids in the Bids table that meet or exceed the reservePrice. This way, we can keep things simpler without adding an extra table.
        // UPDATE Auctions 
        // SET AuctionStatusID = 2  -- Assuming 2 represents 'closed'
        // WHERE EndDate <= NOW() AND AuctionStatusID = 1; -- 1 represents 'open'

    // SELECT BidderID
    // FROM Bids
    // WHERE AuctionID = ?  -- Replace with the actual AuctionID
    // ORDER BY BidAmount DESC
    // LIMIT 1;

    // We don’t want to store the winner’s info in both the Auctions and Bids tables because it could lead to redundancy and inconsistencies. Instead, we just look at the Bids table to find the highest bid when the auction ends, which keeps things simple and up-to-date without repeating data.
        // this is how we'd have done so: 

// The system should confirm to both the winner and seller the outcome of an auction.
    // ==> Get all bids [that loggued user made a bid on] that are due [either for endTime reached, or reservePrice met]
            // ==> How each user profile, buyers and seller participating in an auction, will be informed about this outcome?
  }

  ngOnInit(): void {
    // this.auctionID = this.route.snapshot.paramMap.get('auctionID');
    // console.log('Auction ID:', this.auctionID);
    this.data = history.state;
    console.log(this.data)
    this.offerAmount = this.data.StartingPrice;

    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      this.fetchBids();
    });

  }

  fetchBids() {
    // if (this.auctionID) {
      // this.http.post(`/api/get-bids`, { AuctionID: this.data.AuctionID}).subscribe({
      //   next: (bids: any) => {
      //     // Handle the fetched bids here
      //     console.log('Bids:', bids);
      //     this.bids = bids;
      //     // You can store the bids in a component property or use them to update the UI
      //   },
      //   error: (error) => {
      //     console.error('Error fetching bids:', error);
      //     // Handle the error, e.g., display an error message
      //   }
      // });

    // }

    this.http.get(`http://localhost:3000/api/bids/${this.data.AuctionID}`).subscribe({
      next: (bids: any) => {
          console.log('Bids:', bids);
          this.bids = bids
      },  
      error: (error) => {
        // ... handle the error
        console.error('Error fetching bids:', error);
      }
    });    
  }

  makeOffer() {
    console.log('Offer made:', this.offerAmount);
    const user = this.sessionComponent.getUser();
    const bidderUserID = user != null ? user["userID"] : 1;

    const requestBody = {
      BidAmount: this.offerAmount,
      BidderUserID: bidderUserID, // Assuming you have BuyerID in buyerDetails
      AuctionID:  this.data.AuctionID
    };

  
    this.http.post('http://localhost:3000/api/bid', requestBody).subscribe({
      next: (response) => {
        console.log('- - - - - - - - - - - - ');
        console.log('Bid successful:', response);
        console.log('- - - - - - - - - - - - ');
        // Handle successful bid, e.g., display a success message or update the UI
      },
      error: (error) => {
        console.error('Bid failed:', error);
        // Handle bid error, e.g., display an error message
      }
    });
    
    // Logic for making an offer
    // alert('Offer made!');

    // {
    //   "BidAmount": this.data.offerAmount,
    //   // "BidderID": , // either user id (and perform search on backend) or directly send buyer_id if i have it here, on the frontend
    //   "AuctionID": this.auctionID
    // }
    // BidAmount
    // BidderID
    // AuctionID


    // create logic: if you meet Reserve Price, then you are winner

    //  if winner, update auction ad ended

    //  communicate to both seller and buyer 

    //-- 7. Create the `Bids` Table
    // CREATE TABLE `Bids` (
    //     `BidID` INT AUTO_INCREMENT PRIMARY KEY,
    //     `BidAmount` DECIMAL(10, 2) NOT NULL,
    //     `BidTime` DATETIME DEFAULT CURRENT_TIMESTAMP,
    //     `BidderID` INT NOT NULL,
    //     `AuctionID` INT NOT NULL,
    //     FOREIGN KEY (`BidderID`) REFERENCES `BuyerDetails`(`BuyerID`),
    //     FOREIGN KEY (`AuctionID`) REFERENCES `Auctions`(`AuctionID`)
    // );

    // -- 6. Create the `Auctions` Table
    // CREATE TABLE `Auctions` (
    //     `AuctionID` INT AUTO_INCREMENT PRIMARY KEY,
    //     `SellerID` INT NOT NULL,
    //     `ItemName` VARCHAR(255),
    //     `ItemDescription` TEXT,
    //     `StartingPrice` DECIMAL(10, 2),
    //     `ReservePrice` DECIMAL(10, 2),
    //     `ImageURL` VARCHAR(255),
    //     `StartDate` DATETIME,
    //     `EndDate` DATETIME,
    //     -- `HighestBid` INT,
    //     `CategoryID` INT NOT NULL,
    //     FOREIGN KEY (`SellerID`) REFERENCES `SellerDetails`(`SellerID`),
    //     -- FOREIGN KEY (`HighestBid`) REFERENCES `Bids`(`BidID`),
    //     FOREIGN KEY (`CategoryID`) REFERENCES `ItemCategory`(`CategoryID`)
    // );

  }
  
  addToCart() {
    // Logic for adding to cart
    // alert('Item added to cart!');
  }

}




// auction = {
//   title: 'Sample Auction Item',
//   description: 'This is a detailed description of the auction item.',
//   startingPrice: '$100',
//   reservePrice: '$150',
//   category: 'Art',
//   imageUrl: 'https://placehold.co/500x400'
// };



// // Rating functionality
// rating: number = 0; // Store the selected rating
// comment: string = ''; // Store the user's comment
// comments: string[] = []; // Store all comments

// rateSeller(stars: number) {
//   this.rating = stars; // Set the selected rating
//   console.log(`Rated seller with ${stars} stars.`); // Fixed string interpolation
// }

// hoverRating(stars: number) {
//   const starsElements = document.querySelectorAll('.star-rating .fa-star');
//   starsElements.forEach((star, index) => {
//     star.classList.toggle('checked', index < stars);
//   });
// }

// resetHover() {
//   const starsElements = document.querySelectorAll('.star-rating .fa-star');
//   starsElements.forEach((star, index) => {
//     star.classList.toggle('checked', index < this.rating);
//   });
// }

// submitComment() {
//   if (this.comment.trim()) {
//     this.comments.push(this.comment); // Add the comment to the list
//     this.comment = ''; // Clear the input field
//     console.log('Comment submitted:', this.comment);
//   }
// }