import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common'; 

@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css'] // Corrected from styleUrl to styleUrls
})
export class AuctionDetailComponent implements OnInit {
  auctionID: string | null = null;
  auction: any;
  data: any;
  offerAmount: number = 0; // To store the offer amount

  constructor(private route: ActivatedRoute) {

// Buyers can bid for items 
    // ==> Just update Bids table with corresponding parameters: BidAmount, BidderID, AuctionID
// Buyers see the bids other users make as they are received 
    // ==> Get all bids on Auctions I made a bid for
            // Shall I communicate through email? I don't think it's "core functionality"
            // How will the buyer be able to "see the bids other users make as they are received"?
// The system will manage the auction until the set end time and award the item to the highest bidder.
    // ==> Get all bids [that loggued user made a bid on] that are due [either for endTime reached, or reservePrice met]
// The system should confirm to both the winner and seller the outcome of an auction.
    // ==> Get all bids [that loggued user made a bid on] that are due [either for endTime reached, or reservePrice met]
            // ==> How each user profile, buyers and seller participating in an auction, will be informed about this outcome?
  }

  ngOnInit(): void {
    this.auctionID = this.route.snapshot.paramMap.get('auctionID');
    console.log('Auction ID:', this.auctionID);
    this.data = history.state;
    console.log(this.data)
    this.offerAmount = this.data.StartingPrice;

  }

  makeOffer() {
    console.log('Offer made:', this.offerAmount);
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