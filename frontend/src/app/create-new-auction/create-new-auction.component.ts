import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgIf } from '@angular/common'; // Import NgFor for template rendering
import { Router } from '@angular/router';
import { SessionComponent } from './../session.component'; // Adjust the path if needed

@Component({
  selector: 'app-create-new-auction',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './create-new-auction.component.html',
  styleUrl: './create-new-auction.component.css'
})
export class CreateNewAuctionComponent {
  createAuctionForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private sessionComponent: SessionComponent
  ) {
    this.createAuctionForm = this.fb.group({
      SellerID: ['',],
      ItemName: ['', Validators.required],
      ItemDescription: ['', Validators.required],
      StartingPrice: ['', Validators.required],
      ReservePrice: ['', Validators.required],
      StartDate: ['', ],
      EndDate: ['', Validators.required],
      CategoryID: ['', Validators.required],
      ImageURL: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorMessage = ''; 

    if (this.createAuctionForm.invalid) {
      console.log(this.createAuctionForm)
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    const formData = this.createAuctionForm.value;
    if (!this.sessionComponent.getUser) {
      console.log('no user session')
      return;
    }
    const user = this.sessionComponent.getUser();
    console.log(user);
    let requestBody: {
      SellerID: string,
      ItemName: string,
      ItemDescription: string,
      StartingPrice: number,
      ReservePrice: number,
      StartDate: Date,
      EndDate: Date,
      CategoryID: string,
      ImageURL: string
    } = {
      SellerID: user != null ? String(user["UserID"]) : "",
      ItemName: formData.ItemName, 
      ItemDescription: formData.ItemDescription,
      StartingPrice: formData.StartingPrice,
      ReservePrice: formData.ReservePrice,
      StartDate: new Date(), 
      EndDate: new Date(formData.EndDate), 
      CategoryID: formData.CategoryID, 
      ImageURL: formData.ImageURL
    };

    console.log("requestBody")
    console.log(requestBody)
    console.log("requestBody")


    // CategoryID: "1"
    // EndDate: "2024-11-15 14:00:00"
          // ImageURL: undefined
    // ItemDescription: "test1"
    // ItemName: "test1"
          // ReservePrice: undefined
    // SellerID: "1"
    // StartDate: "2024-11-10 14:00:00"
          // StartingPrice: undefined

    // this.http.post('http://localhost:3000/api/auctions', requestBody)
    //   .subscribe({
    //     next: (response) => {
    //       console.log("-----------")
    //       console.log(response)
    //       console.log("-----------")
    //       // console.log('Auction created successfully:', response);
    //       // Handle success (show message, redirect, etc.)
    //     },
    //     error: (error) => {
    //       console.error('Error creating auction:', error);
    //       // Handle error (show message, etc.)
    //     }
    //   });
  }
}