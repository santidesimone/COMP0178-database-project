import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auction-detail.component.html',
  styleUrl: './auction-detail.component.css'
})
export class AuctionDetailComponent {
  auction = {
    title: 'Sample Auction Item',
    description: 'This is a detailed description of the auction item.',
    startingPrice: '$100',
    reservePrice: '$150',
    category: 'Art',
    imageUrl: 'https://placehold.co/500x400'
  };

  makeOffer() {
    // Logic for making an offer
    alert('Offer made!')
  }

  addToCart() {
    // Logic for adding to cart
    alert('Item added to cart!')
  }

// Rating functionality
  rating: number = 0; // Store the selected rating
  comment: string = ''; // Store the user's comment
  comments: string[] = []; // Store all comments

  rateSeller(stars: number) {
    this.rating = stars; // Set the selected rating
    console.log('Rated seller with ${stars} stars.');
  }

  hoverRating(stars: number) {
    // Optional: Highlight the stars up to the hovered one
    const starsElements = document.querySelectorAll('.star-rating .fa-star');
    starsElements.forEach((star, index) => {
      star.classList.toggle('checked', index < stars);
    });
  }

  resetHover() {
    // Reset star highlighting when mouse leaves
    const starsElements = document.querySelectorAll('.star-rating .fa-star');
    starsElements.forEach((star, index) => {
      star.classList.toggle('checked', index < this.rating);
    });
  }

  submitComment() {
    if (this.comment.trim()) {
      this.comments.push(this.comment); // Add the comment to the list
      this.comment = ''; // Clear the input field
      console.log('Comment submitted:', this.comment);
    }
  }

}

