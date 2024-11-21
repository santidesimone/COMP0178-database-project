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
  selector: 'app-bids-and-purchases',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe, 
    NgFor, 
    NgIf
  ],  templateUrl: './bids-and-purchases.component.html',
  styleUrls: ['./bids-and-purchases.component.css'] // Corrected from styleUrl to styleUrls
})
export class BidsAndPurchasesComponent implements OnInit {
  auctionID: string | null = null;
  auction: any;
  data: any;
  bids: any;
  offerAmount: number = 0; // To store the offer amount
  userId: any;
  user: any;
  buyerUserID: any;
  purchases: any;
  userIsBuyer: any;

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder, 
      private http: HttpClient, 
      private router: Router,
      private sessionComponent: SessionComponent, 

    ) {
    this.user = this.sessionComponent.getUser();
    // this.buyerUserID = this.user != null ? this.user["userID"] : 1;
    this.buyerUserID = this.user != null ? this.user["userID"] : 1;
  }

  ngOnInit(): void {
    if(!this.sessionComponent.getUser()){
      this.router.navigate(['/signin']); 
    }
    this.route.paramMap.subscribe(params => {
      this.fetchBuyerPurchases();
      this.fetchBuyerBids();
    });
    let user:any = this.sessionComponent.getUser();
    if (user.hasOwnProperty('buyerDetails')) {
      this.userIsBuyer = true;
    }
    else{
      this.userIsBuyer = false;
    }
  }

  fetchBuyerPurchases() {
    this.http.get(`http://localhost:3000/api/buyer/purchases/${this.buyerUserID}`).subscribe({
      next: (purchases: any) => {
        console.log('Buyer purchases:', purchases);
        this.purchases = purchases;
        // ... handle the fetched purchases
      },
      error: (error) => {
        console.error('Error fetching buyer purchases:', error);
        // ... handle the error
      }
    });
  }

  fetchBuyerBids() {
    this.http.get(`http://localhost:3000/api/buyer/bids/${this.buyerUserID}`).subscribe({
      next: (bids: any) => {
        console.log('Buyer bids:', bids);
        this.bids = bids;
        // ... handle the fetched bids
      },
      error: (error) => {
        console.error('Error fetching buyer bids:', error);
        // ... handle the error
      }
    });
  }

}


