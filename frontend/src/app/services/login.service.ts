import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = '/api/login';

  constructor(private http: HttpClient) {}

  // POST - Used for login or creating a resource
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, credentials);
  }

//   // GET - Retrieve data (e.g., get user profile or status)
//   getUserProfile(userId: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/${userId}`);
//   }

//   // PUT - Update data (e.g., update user profile or password)
//   updateUserProfile(userId: string, updateData: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/${userId}`, updateData);
//   }

//   // DELETE - Delete data (e.g., delete a user account or logout session)
//   deleteUserAccount(userId: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/${userId}`);
//   }
}
