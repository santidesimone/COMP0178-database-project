import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { NgFor, NgIf} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common'; 
import { SessionComponent } from '../session.component'; // Adjust the path if needed

 
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, JsonPipe, NgFor, NgIf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
    searchForm: FormGroup;
    errorMessage = '';
    searchResults: any[] = []; // Use any[] to store the JSON result
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
}