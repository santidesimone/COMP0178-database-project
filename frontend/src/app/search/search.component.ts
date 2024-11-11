import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgFor } from '@angular/common'; // Import NgFor for template rendering
import { RouterLink } from '@angular/router';

// Define the SearchResult interface
interface SearchResult {
  title: string;
  price: string;
  description: string;
  imageUrl: string;
}
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink], // Add FormsModule, NgFor to the imports array
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // query: string = '';
  // searchResults: SearchResul  t[] = []; // Define the correct type for searchResults

  constructor() {
    // Sample data to simulate search results
    // this.searchResults = Array.from({ length: 30 }, (_, i) => ({
    //   title: `Product ${i + 1}`,
    //   price: `$${(i + 1) * 10}.00`,
    //   description: `This is a brief description for Product ${i + 1}.`,
    //   imageUrl: 'https://placehold.co/300x200'
    // }));
  }

  onSearch() {
    // Logic for handling search can be added here
    // console.log(`Searching for: ${this.query}`);
  }
}



// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { NgFor } from '@angular/common';
// import { RouterLink } from '@angular/router';

// interface SearchResult {
//   // Adjust properties to match your actual data structure
//   itemName: string;
//   currentPrice: number;
//   description: string; 
//   // ... other properties like imageUrl, category, city, etc. 
// }

// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [FormsModule, NgFor, RouterLink, HttpClientModule], // Import HttpClientModule
//   templateUrl: './search.component.html',
//   styleUrl: './search.component.css'
// })
// export class SearchComponent {
//   keywords: string = '';
//   minPrice: number | null = null;
//   maxPrice: number | null = null;
//   category: string = '';
//   city: string = '';
//   stateProvince: string = '';
//   searchResults: SearchResult[] = [];

//   constructor(private http: HttpClient) {}

//   onSearch() {
//     const params = { 
//       keywords: this.keywords,
//       minPrice: this.minPrice,
//       maxPrice: this.maxPrice,
//       category: this.category,
//       city: this.city,
//       stateProvince: this.stateProvince
//     };

//     this.http.get<SearchResult[]>('/api/search', { params })
//       .subscribe(results => {
//         this.searchResults = results;
//       });
//   }
// }


