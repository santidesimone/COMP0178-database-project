import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionComponent } from '../session.component'; // Adjust the path if needed

@Component({
  selector: 'app-my-auctions-and-sales',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe, 
    NgFor, 
    NgIf
  ],  templateUrl: './my-auctions-and-sales.component.html',
  styleUrls: ['./my-auctions-and-sales.component.css'] // Corrected from styleUrl to styleUrls
})
export class MyAuctionsAndSalesComponent implements OnInit {
  auctionID: string | null = null;
  auction: any;
  data: any;
  bids: any;
  offerAmount: number = 0; 
  userId: any;
  user: any;
  sellerUserID: any;
  currentAuctions: any;
  userIsSeller: any;
  currentSales: any;
  winnerDetails: { 
      [key: number]: { 
          username: string, 
          email: string,
          winningBidAmount: number 
        } 
  } = {};  

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder, 
      private http: HttpClient, 
      private router: Router,
      private sessionComponent: SessionComponent, 

    ) {
      this.user = this.sessionComponent.getUser();
      this.sellerUserID = this.user != null ? this.user["userID"] : 1;

  }

  ngOnInit(): void {
    if(!this.sessionComponent.getUser()){
      this.router.navigate(['/signin']); 
    }
    this.route.paramMap.subscribe(params => {
      this.fetchSellerAuctions();
      this.fetchSellerSales();
    });
    let user:any = this.sessionComponent.getUser();
    if (user.hasOwnProperty('sellerDetails')) {
      this.userIsSeller = true;
    }
    else{
      this.userIsSeller = false;
    }
  }

  fetchSellerAuctions() {
    this.http.get(`http://localhost:3000/api/seller/auctions/${this.sellerUserID}`).subscribe({
      next: (auctions: any) => {
        console.log('Seller auctions:', auctions);
        this.currentAuctions = auctions;
        // ... handle the fetched auctions
      },
      error: (error) => {
        console.error('Error fetching seller auctions:', error);
        // ... handle the error
      }
    });
  }

  fetchSellerSales() {
    this.http.get(`http://localhost:3000/api/seller/sales/${this.sellerUserID}`).subscribe({
      next: (sales: any) => {
        console.log('Seller auctions:', sales);
        this.currentSales = sales;
        // ... handle the fetched auctions
      },
      error: (error) => {
        console.error('Error fetching seller auctions:', error);
        // ... handle the error
      }
    });
  }

  getWinnerDetails(auctionID: number): void {
    this.http.get(`http://localhost:3000/api/auction/winner/${auctionID}`).subscribe(
      (winner: any) => {
        if (winner) {
          console.log(winner)
          this.winnerDetails[auctionID] = { 
            username: winner.WinnerName, 
            email: winner.WinnerEmail,
            winningBidAmount: winner.WinningBidAmount,
           };
           console.log(this.winnerDetails)
        }
      },
      (error) => {
        console.error('Error fetching winner details:', error);
      }
    );
  }
}


// 