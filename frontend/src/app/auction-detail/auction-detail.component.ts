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

  }


  ngOnInit(): void { // Change return type to void
    if(!this.sessionComponent.getUser()){
      this.router.navigate(['/signin']); 
    }
    // else{
      this.data = history.state;
      console.log(this.data)
      this.offerAmount = this.data.StartingPrice;
  
      // Subscribe to route parameter changes
      this.route.paramMap.subscribe(params => {
        this.fetchBids();
      });
    // }
    // this.fetchFavorites(); // Fetch favorites on component initialization

  }

  fetchBids() {
    this.http.get(`http://localhost:3000/api/bids/${this.data.AuctionID}`).subscribe({
      next: (bids: any) => {
          console.log('Bids:', bids);
          this.bids = bids;
          this.updateAuctionStatuses();
      },  
      error: (error) => {
        // ... handle the error
        console.error('Error fetching bids:', error);
      }
    });    
  }

  updateAuctionStatuses() {
    this.http.post('http://localhost:3000/api/update-auctions-status', {}).subscribe({ 
      next: (response: any) => {
        console.log('Auction statuses updated:', response);
      },
      error: (error) => {
        console.error('Error updating auction statuses:', error);
      }
    });
  }
  makeOffer() {
    console.log('Offer made:', this.offerAmount);
    const user = this.sessionComponent.getUser();
    // const bidderUserID = user != null ? user["userID"] : 1;
    const bidderUserID = (user as any).userID || 1;

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

  }

  fetchFavorites() {
    // Call API to get user's favorites
    // this.http.get(`/api/favorites/${this.userId}`).subscribe({ // Replace with your actual endpoint
    //   next: (favorites: any) => {
    //     this.favorites = favorites.map((favorite: any) => favorite.AuctionID); 
    //   },
    //   error: (error) => {
    //     console.error('Error fetching favorites:', error);
    //   }
    // });
  }

  // isFavorite(auctionId: number): boolean {
  //   return this.favorites.includes(auctionId);
  // }

  toggleFavorite(auctionId: number) {
    // if (this.isFavorite(auctionId)) {
    //   // Remove favorite
    //   this.http.delete('/api/favorites', { body: { userId: this.userId, auctionId } }).subscribe({
    //     next: () => {
    //       console.log('Removed from favorites');
    //       this.favorites = this.favorites.filter(id => id !== auctionId); // Update the favorites array
    //     },
    //     error: (error) => {
    //       console.error('Error removing favorite:', error);
    //     }
    //   });
    // } else {
    //   // Add favorite
    //   this.http.post('/api/favorites', { userId: this.userId, auctionId }).subscribe({
    //     next: () => {
    //       console.log('Added to favorites');
    //       this.favorites.push(auctionId); // Update the favorites array
    //     },
    //     error: (error) => {
    //       console.error('Error adding favorite:', error);
    //     }
    //   });
    // }
  }


}




