import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private baseUrl = '/api/user/rating';

  constructor(private http: HttpClient) {}

  getUserRating(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
}