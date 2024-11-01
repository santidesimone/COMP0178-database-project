import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private baseUrl = '/api/signin';

  constructor(private http: HttpClient) {}

  signin(userDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, userDetails);
  }
}