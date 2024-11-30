import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionComponent } from '../session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { NgIf, NgFor } from '@angular/common'; // Import NgFor for template rendering
import { CommonModule } from '@angular/common';

interface User {
  userID: number; 
  buyerDetails?: any;
}

@Component({
  selector: 'app-bids-and-purchases',
  standalone: true,
  templateUrl: './bids-and-purchases.component.html',
  styleUrls: ['./bids-and-purchases.component.css'],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgIf,
    NgFor
  ],  
})
export class BidsAndPurchasesComponent implements OnInit {
  userId: number | null = null;
  purchases: any[] = [];
  bids: any[] = [];
  user: User | null = null;  
  userIsBuyer: boolean = false;
  user2: any;
  winnerDetails: { 
    [key: number]: { 
        username: string, 
        email: string,
        winningBidAmount: number,
        discountApplied?: boolean,
        discount?: any

      } 
  } = {};  
    
  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionComponent: SessionComponent
  ) {
    this.user = this.sessionComponent.getUser();
    this.userId = this.user ? this.user["userID"] : 1;

  }

  ngOnInit(): void {
    if (!this.userId) {
      this.router.navigate(['/signin']);
      return;
    }

    this.fetchBuyerPurchases();
    this.fetchBuyerBids();
  }

  fetchBuyerPurchases() {
    this.http.get<any[]>(`http://localhost:3000/api/buyer/purchases/${this.userId}`).subscribe({
      next: (purchases) => {
        this.purchases = purchases;
      },
      error: (error) => {
        console.error('Error fetching purchases:', error);
      }
    });
  }

  fetchBuyerBids() {
    this.http.get<any[]>(`http://localhost:3000/api/buyer/bids/${this.userId}`).subscribe({
      next: (bids) => {
        this.bids = bids;
      },
      error: (error) => {
        console.error('Error fetching bids:', error);
      }
    });
  }

  navigateToAuctionDetail(auction: any): void {
    this.router.navigateByUrl('/auction-detail', { state: auction });
    console.log("----------------------------")
    console.log(auction)
    console.log("----------------------------")
  }

  submitRating(purchase: any) {
    if (!purchase.newRating) {
      alert('Please select a rating before submitting.');
      return;
    }

    const ratingData = {
      AuctionID: purchase.AuctionID,
      UserID: this.userId,
      Rating: purchase.newRating
    };

    this.http.post('http://localhost:3000/api/ratings', ratingData).subscribe({
      next: (response: any) => {
        alert(response.message || 'Rating submitted successfully.');
        purchase.Rating = purchase.newRating;
        delete purchase.newRating; // Cleanup temporary rating field
      },
      error: (error) => {
        console.error('Error submitting rating:', error);
        alert('An error occurred while submitting your rating. Please try again later.');
      }
    });
  }

  applyInviteLinkDiscount(userEmail: string, purchaseId: number): void {
    const body = { email: userEmail };
  
    this.http.post('http://localhost:3000/api/invite-link-discount', body).subscribe(
      (response: any) => {
        if (response && response.user) {

          console.log("will apply discount !!!!")
          console.log(response)
          console.log("purchaseId", purchaseId)
          console.log("this.purchases.find(p => p.AuctionID === purchaseId)",this.purchases.find(p => p.AuctionID === purchaseId))
          console.log("this.purchases.find(p => p.AuctionID === purchaseId)?.WinnerPrice!",this.purchases.find(p => p.AuctionID === purchaseId)?.WinnerPrice!)
          // Apply a 10% discount to the purchase and map it to the purchase
          const discount = 0.1 * this.purchases.find(p => p.AuctionID === purchaseId)?.WinnerPrice!;
          const purchase = this.purchases.find(p => p.AuctionID === purchaseId);
          
          if (purchase) {
            this.winnerDetails[purchaseId].discountApplied = true;
            this.winnerDetails[purchaseId].discount = discount;
          }
        }
      },
      (error) => {
        console.error('Error during invite link discount process:', error);
      }
    );
  }
  

  getWinnerDetails(auctionID: number ): void {
    this.http.get(`http://localhost:3000/api/auction/winner/${auctionID}`).subscribe(
      (winner: any) => {
        if (winner) {
          this.winnerDetails[auctionID] = { 
            username: winner.WinnerName, 
            email: winner.WinnerEmail,
            winningBidAmount: winner.WinningBidAmount,
          };
          const purchase = this.purchases.find(p => p.AuctionID === auctionID);
          if (purchase) {
            this.applyInviteLinkDiscount(winner.WinnerEmail, auctionID);
          }
        }
      },
      (error) => {
        console.error('Error fetching winner details:', error);
      }
    );
  }
  



}
