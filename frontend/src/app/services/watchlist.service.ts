import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private baseUrl = '/api/watchlist';

  constructor(private http: HttpClient) {}

  // GET - Retrieve all items in the watchlist
  getWatchlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // POST - Add a new item to the watchlist
  addToWatchlist(itemData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, itemData);
  }

  // PUT - Update an item in the watchlist by ID
  updateWatchlistItem(id: string, itemData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, itemData);
  }

  // DELETE - Remove an item from the watchlist by ID
  removeFromWatchlist(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
