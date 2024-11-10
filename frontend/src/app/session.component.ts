import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session', 
  template: '' 
})
export class SessionComponent implements OnInit {
  currentUser = null;

  constructor(
              private router: Router) { 
      
  }

  ngOnInit() {
    // You can add any initialization logic here if needed
  }

  setUser(user: any) {
    this.currentUser = user;
  }

  getUser() {
    return this.currentUser;
  }

  clearUser() {
    this.currentUser = null;
    this.router.navigate(['/signin']); 
  }
}