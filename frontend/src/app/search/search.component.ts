import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

 
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule,
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
    private router: Router) {
  
    this.searchForm = this.fb.group({
      keywords: ['', [Validators.required]], 
      minPrice: [''],
      maxPrice: [''],
      category: [''],
      city: [''],
      stateProvince: [''],
      endDate: ['']
    });
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
        endDate: formData.endDatee
      };


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