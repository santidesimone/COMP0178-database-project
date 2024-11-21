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
    console.log("current signed in user:", this.sessionComponent.getUser() )
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

  ngOnInit(): void {
    if(!this.sessionComponent.getUser()){
      this.router.navigate(['/signin']); 
    }
  }
  onSubmit() {
    console.log('create auction button was pressed')
    this.errorMessage = ''; 

    if (this.createAuctionForm.invalid) {
      console.log(this.createAuctionForm)
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    const formData = this.createAuctionForm.value;
    const user = this.sessionComponent.getUser();

    if (Object.keys(user).length === 0 ) {
      console.log('no user stored in session')
      return;
    }
    
    // let userID = 1;
    // if(user && user.hasOwnProperty('userID') ){
    //   userID = user["userID"]
    // }
    console.log("current user:");
    console.log(user);
    console.log("----:");

    function formatDateToMySQL(date: Date): string {
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    
    let requestBody: {
      SellerID: number,
      ItemName: string,
      ItemDescription: string,
      StartingPrice: number,
      ReservePrice: number,
      StartDate: string,
      EndDate: string,
      CategoryID: string,
      ImageURL: string
    } = {
      // SellerID: user?.userID ?? 1, 
      // SellerID: user && user.hasOwnProperty('userID') ? user["userID"] : 1,
      // SellerID: user && user.hasOwnProperty('userID') ? user["userID"] : 1,
      SellerID: (user as any).userID || 1, 
      ItemName: formData.ItemName, 
      ItemDescription: formData.ItemDescription,
      StartingPrice: formData.StartingPrice,
      ReservePrice: formData.ReservePrice,
      StartDate: formatDateToMySQL(new Date()), 
      // EndDate: new Date(formData.EndDate), 
      // EndDate: new Date(formatDateToMySQL(formData.EndDate)),
      EndDate: formatDateToMySQL(new Date(formData.EndDate)),
      CategoryID: formData.CategoryID, 
      ImageURL: formData.ImageURL
    };

    // console.log("requestBody")
    // console.log(requestBody)
    // console.log("requestBody")

    this.http.post('http://localhost:3000/api/auctions', requestBody)
      .subscribe({
        next: (response) => {
          console.log('Auction created successfully:', response);
          // may be an alert saying "Auction created successfully"
          alert("Auction was created successfully")
          this.router.navigate(['/search']); 
          // Handle success (show message, redirect, etc.)
        },
        error: (error) => {
          console.error('Error creating auction:', error);
          // Handle error (show message, etc.)
        }
      });
  }
}