import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BidsService {
  private baseUrl = '/api/bids';

  constructor(private http: HttpClient) {}

  placeBid(bidDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, bidDetails);
  }
}