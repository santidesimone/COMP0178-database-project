import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { NgFor, NgIf, NgClass} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common'; 
import { SessionComponent } from '../session.component'; // Adjust the path if needed

 
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, JsonPipe, NgFor, NgIf, NgClass
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchForm: FormGroup;
  errorMessage = '';
  searchResults: any[] = []; // Use any[] to store the JSON result
  favorites: number[] = []; // Array to hold favorite auction IDs
  recommendations: any[] = []; // Array to store recommendations

  displayInviteLink: boolean = false;
  inviteLinkBannerIsVisible: boolean = true;
  inviteCode: string = "";
  user: any = {};

  result: any;

constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private sessionComponent: SessionComponent, 
  ) {
  
    this.searchForm = this.fb.group({
      keywords: [''], 
      minPrice: [''],
      maxPrice: [''],
      category: [''],
      city: [''],
      stateProvince: [''],
      endDate: ['']
    });

    this.http.post('http://localhost:3000/api/search/all', {}).subscribe({
        next: (response: any) => { // Use any for the response type
            this.searchResults = response; // Store the JSON result in the array
            console.log('/ / / / / / / / / /');
            console.log('Search successful:', this.searchResults);
            console.log('/ / / / / / / / / /');
        },
        error: (error) => {
          console.error('Search failed:', error);
          // Handle signin error, e.g., display an error message
        }
      });

  }
  navigateToAuctionDetail(auction: any): void {
    // this.router.navigate(['/auction-detail', auctionID]);
    this.router.navigateByUrl('/auction-detail', { state: auction });
    console.log("----------------------------")
    console.log(auction)
    console.log("----------------------------")
  }
  ngOnInit(): void {
    if(!this.sessionComponent.getUser()){
      this.router.navigate(['/signin']); 
    }
    this.fetchRecommendations();
  }

  onSearch() {
    this.errorMessage = ''; 

    if (this.searchForm.invalid) {
        console.log('form is invalid!')
        console.log(this.searchForm)
        this.errorMessage = 'Please fill in all required fields and select at least one role.';
        return;
      }
    const formData = this.searchForm.value;

    let requestBody: {
        keywords: string,
        minPrice: number,
        maxPrice: number,
        category: number,
        city: string,
        stateProvince: string,
        endDate: Date
      } = {
        keywords: formData.keywords,
        minPrice: formData.minPrice,
        maxPrice: formData.maxPrice,
        category: formData.category,
        city: formData.city,
        stateProvince: formData.stateProvince,
        endDate: formData.endDate
 
      };

    console.log("formData.endDate")
    console.log(formData.endDate)
    console.log("-----------------")

    this.http.post('http://localhost:3000/api/search', requestBody).subscribe({
        next: (response: any) => { // Use any for the response type
            this.searchResults = response; // Store the JSON result in the array
            console.log('/ / / / / / / / / /');
            console.log('Search successful:', this.searchResults);
            console.log('/ / / / / / / / / /');
        },
        error: (error) => {
          console.error('Search failed:', error);
          // Handle signin error, e.g., display an error message
        }
      });
  }


  fetchFavorites() {
    let user = this.sessionComponent.getUser();
    let userID = user != null ? user["userID"] : 1;
    this.http.get<number[]>(`http://localhost:3000/api/watchlist?userId=${userID}`).subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (error) => {
        console.error('Error fetching favorites:', error);
      }
    });
  }

  fetchRecommendations() {
    let user = this.sessionComponent.getUser();
    let userID = user != null ? user["userID"] : 1;  // Use the userID from session or default to 1 if not available
    
    // Assuming the recommendations endpoint accepts userID as a query parameter
    this.http.get<any[]>(`http://localhost:3000/api/recommendations/${userID}`).subscribe({
      next: (data) => {
        this.recommendations = data;  // Assuming 'data' contains an array of recommended items
      },
      error: (error) => {
        console.error('Error fetching recommendations:', error);
      }
    });
  }
  

  isFavorite(auctionId: number): boolean {
    return this.favorites.includes(auctionId);
  }

  toggleFavorite(auctionId: number): void {
    let user = this.sessionComponent.getUser();
    let userID = user != null ? user["userID"] : 1;
    if (this.isFavorite(auctionId)) {
      this.http.delete('http://localhost:3000/api/watchlist', { body: { userId: userID, auctionId } }).subscribe({
        next: () => {
          console.log('Removed from watchlist');
          this.favorites = this.favorites.filter(id => id !== auctionId); // Update the favorites array
        },
        error: (error) => {
          console.error('Error removing watchlist:', error);
        }
      });
    } else {
      // Add favorite
      this.http.post('http://localhost:3000/api/watchlist', { userId: userID, auctionId }).subscribe({
        next: () => {
          console.log('Added to watchlist');
          this.favorites.push(auctionId); // Update the favorites array
        },
        error: (error) => {
          console.error('Error adding watchlist:', error);
        }
      });
    }
  }

  generateInviteLink(){
    this.displayInviteLink = true;
    let user:any = this.sessionComponent.getUser();
    console.log("- - - - - - - - - - - ")
    console.log(user)
    console.log("- - - - - - - - - - - ")
    console.log("this.inviteCode 0", this.inviteCode)

    if (user != null && user["inviteCode"]){
      this.inviteCode = user["inviteCode"];
      console.log(this.user)
      console.log("this.inviteCode 1", this.inviteCode)
      this.inviteLinkBannerIsVisible = true;
    }
  }
  getInviteLink(){
    return "http://localhost:8080/signup/"+this.inviteCode;
  }


}