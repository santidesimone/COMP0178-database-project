import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionComponent } from '../session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { NgIf, NgFor } from '@angular/common'; // Import NgFor for template rendering

interface User {
  userID: number; // Add userID to the User interface
  buyerDetails?: any;
}


@Component({
  selector: 'app-bids-and-purchases',
  standalone: true,
  templateUrl: './bids-and-purchases.component.html',
  styleUrls: ['./bids-and-purchases.component.css'],
  imports: [
    FormsModule,  // Import FormsModule to use ngModel
    ReactiveFormsModule, 
    NgIf,
    NgFor
  ],  
})
export class BidsAndPurchasesComponent implements OnInit {
  userId: number | null = null;
  purchases: any[] = [];
  bids: any[] = [];
  // userIsBuyer: boolean = false;
  // user: User | null = null;

  // user: { buyerDetails?: any } | null = null; 
  user: User | null = null;  // Assuming user can be null as well
  userIsBuyer: boolean = false;
  user2: any;
  
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionComponent: SessionComponent
  ) {
     this.user = this.sessionComponent.getUser();
    // if (this.user != null && ){ 
    //   this.user2 = {
    //     // ...(typeof this.user === 'object' ? this.user : {}), 
    //     ...(this.user as Record<string, any>),
    //   }
      
    // }


    // const user = this.sessionComponent.getUser();
    // const requestBody = {
    //   AuctionID: this.data.AuctionID,
    //   UserID: user ? user["userID"] : 1,
   

    this.userId = this.user ? this.user["userID"] : 1;
    // this.userIsBuyer = !!user?.buyerDetails;

    // this.userId = user ? user.userID : null;
      // this.userIsBuyer = (this.user2.hasOwnProperty('buyerDetails'))? true: false;
      // this.userIsBuyer = !!(this.user2?.buyerDetails); 
      // this.userIsBuyer = this.user2?.hasOwnProperty('buyerDetails') ?? false;
      // this.userIsBuyer = this.user2?.buyerDetails !== undefined ? true : false;

      // this.userIsBuyer = !!this.user?.buyerDetails;
      // this.userIsBuyer = this.user?.buyerDetails !== undefined;
      // this.userIsBuyer = this.user?.buyerDetails !== undefined;
          // Safely check for buyerDetails using optional chaining (?.)
    // this.userIsBuyer = !!this.user?.buyerDetails; 



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
}
