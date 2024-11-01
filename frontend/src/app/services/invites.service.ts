import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvitesService {
  private baseUrl = '/api/user/invites';

  constructor(private http: HttpClient) {}

  sendInvite(inviteDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, inviteDetails);
  }
}