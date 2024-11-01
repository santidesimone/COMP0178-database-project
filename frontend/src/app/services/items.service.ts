import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private baseUrl = '/api/items';

  constructor(private http: HttpClient) {}

  // GET - Retrieve all items
  getAllItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // GET - Retrieve a specific item by ID
  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // POST - Create a new item
  createItem(itemData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, itemData);
  }

  // PUT - Update an existing item by ID
  updateItem(id: string, itemData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, itemData);
  }
}
