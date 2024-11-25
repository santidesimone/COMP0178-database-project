import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionComponent } from '../session.component'; // Adjust the path if needed
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common'; 
import { ChangeDetectorRef } from '@angular/core'
import { NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  standalone: true,
  imports: [
    JsonPipe,
    NgFor, 
    NgIf

  ]
})
export class WatchlistComponent implements OnInit {
  favorites: any[] = [];
  userId: number | undefined; // Replace with dynamic user ID logic as needed

  constructor(private http: HttpClient,
    public sessionComponent: SessionComponent,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if(!this.sessionComponent.getUser()){
        this.router.navigate(['/signin']); 
      }
    this.getFavorites();
  }

  getFavorites(): void {
    console.log("executing getFavorites")
    const user = this.sessionComponent.getUser();
    console.log(user)
    const UserID = user != null ? user["userID"] : 1;
    console.log(UserID)
    this.http.get<any[]>(`http://localhost:3000/api/watchlist/${UserID}`).subscribe({
      next: (data) => {
        this.favorites = data;
        console.log(this.favorites)
        // this.cdRef.detectChanges(); // Notify Angular about the changes

      },
      error: (err) => {
        console.error('Error fetching favorites:', err);
      }
    });
  }

  toggleFavorite(auctionId: number): void {
    let user = this.sessionComponent.getUser();
    let userID = user != null ? user["userID"] : 1;
    // if (this.isFavorite(auctionId)) {
      this.http.delete('http://localhost:3000/api/watchlist', { body: { userId: userID, auctionId } }).subscribe({
        next: () => {
          console.log('Removed from watchlist');
          this.favorites = this.favorites.filter(id => id !== auctionId); // Update the favorites array
          // this.cdRef.detectChanges(); // Notify Angular about the changes
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        }
      });
    // } else {
    //   // Add favorite
    //   this.http.post('http://localhost:3000/api/favorites', { userId: userID, auctionId }).subscribe({
    //     next: () => {
    //       console.log('Added to favorites');
    //       this.favorites.push(auctionId); // Update the favorites array
    //     },
    //     error: (error) => {
    //       console.error('Error adding favorite:', error);
    //     }
    //   });
    // }
  }

}
