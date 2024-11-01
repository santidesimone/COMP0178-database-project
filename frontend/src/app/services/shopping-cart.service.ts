import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private baseUrl = '/api/shopping-cart';

  constructor(private http: HttpClient) {}

  addItemToCart(itemDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, itemDetails);
  }

  getCartItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}