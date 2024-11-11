import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session', 
  template: '' 
})
export class SessionComponent implements OnInit {
  currentUser = null;

  constructor(private router: Router) { }

  ngOnInit() {
    // Retrieve the user from localStorage if it exists
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  setUser(user: any) {
    this.currentUser = user;
    // Store user information in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log("Current user stored in localStorage:", user);
  }

  getUser() {
    // Retrieve user information from localStorage
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.currentUser;
  }

  clearUser() {
    // Clear the user information from component and localStorage
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    console.log("Current user removed from localStorage");
    this.router.navigate(['/signin']);
  }
}
