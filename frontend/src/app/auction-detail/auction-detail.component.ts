import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common'; 

@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css'] // Corrected from styleUrl to styleUrls
})
export class AuctionDetailComponent implements OnInit {
  auctionID: string | null = null;
  auction: any;
  data: any;

  constructor(private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.auctionID = this.route.snapshot.paramMap.get('auctionID');
    console.log('Auction ID:', this.auctionID);
    this.data = history.state;
    console.log(this.data)
  }

  makeOffer() {
    // Logic for making an offer
    // alert('Offer made!');
  }
  
  addToCart() {
    // Logic for adding to cart
    // alert('Item added to cart!');
  }

}




// auction = {
//   title: 'Sample Auction Item',
//   description: 'This is a detailed description of the auction item.',
//   startingPrice: '$100',
//   reservePrice: '$150',
//   category: 'Art',
//   imageUrl: 'https://placehold.co/500x400'
// };



// // Rating functionality
// rating: number = 0; // Store the selected rating
// comment: string = ''; // Store the user's comment
// comments: string[] = []; // Store all comments

// rateSeller(stars: number) {
//   this.rating = stars; // Set the selected rating
//   console.log(`Rated seller with ${stars} stars.`); // Fixed string interpolation
// }

// hoverRating(stars: number) {
//   const starsElements = document.querySelectorAll('.star-rating .fa-star');
//   starsElements.forEach((star, index) => {
//     star.classList.toggle('checked', index < stars);
//   });
// }

// resetHover() {
//   const starsElements = document.querySelectorAll('.star-rating .fa-star');
//   starsElements.forEach((star, index) => {
//     star.classList.toggle('checked', index < this.rating);
//   });
// }

// submitComment() {
//   if (this.comment.trim()) {
//     this.comments.push(this.comment); // Add the comment to the list
//     this.comment = ''; // Clear the input field
//     console.log('Comment submitted:', this.comment);
//   }
// }