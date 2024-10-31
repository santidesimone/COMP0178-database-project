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
  query: string = '';
  searchResults: SearchResult[] = []; // Define the correct type for searchResults

  constructor() {
    // Sample data to simulate search results
    this.searchResults = Array.from({ length: 30 }, (_, i) => ({
      title: `Product ${i + 1}`,
      price: `$${(i + 1) * 10}.00`,
      description: `This is a brief description for Product ${i + 1}.`,
      imageUrl: 'https://placehold.co/300x200'
    }));
  }

  onSearch() {
    // Logic for handling search can be added here
    console.log(`Searching for: ${this.query}`);
  }
}






