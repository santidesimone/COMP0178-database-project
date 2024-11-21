import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
              

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-session', 
  template: '' 
})
export class SessionComponent implements OnInit {
  currentUser = {};
  public isSellerProfileSource = new BehaviorSubject<any>(false); // Initialize with null or initial value
  public isBuyerProfileSource = new BehaviorSubject<any>(false); // Initialize with null or initial value
  isSellerProfile$ = this.isSellerProfileSource.asObservable();
  isBuyerProfile$ = this.isBuyerProfileSource.asObservable();


  updateIsSellerProfile(newValue: any) {
    this.isSellerProfileSource.next(newValue);
  }

  getIsSellerProfile() {
    return this.isSellerProfile$;
  }

  updateIsBuyerProfile(newValue: any) {
    this.isBuyerProfileSource.next(newValue);
  }

  getIsBuyerProfile() {
    return this.isBuyerProfile$;
  }

  constructor(
              private router: Router,
              private route: ActivatedRoute,
  ) 
  { 


  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Retrieve the user from localStorage if it exists
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    });
  }

  setUser(user: object) {
    this.currentUser = user;
    // Store user information in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log("Current user stored in localStorage:", user);
    if (user.hasOwnProperty('sellerDetails')) {
      this.updateIsSellerProfile(true)
    }
    else{
      this.updateIsSellerProfile(false)
    }
    if (user.hasOwnProperty('buyerDetails')) {
      this.updateIsBuyerProfile(true)
    }
    else{
      this.updateIsBuyerProfile(false)
    }
  }

  getUser(): object {
    // Retrieve user information from localStorage
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : {};
    }
    return this.currentUser;
  }

  clearUser() {
    // Clear the user information from component and localStorage
    this.currentUser = {};
    localStorage.removeItem('currentUser');
    console.log("Current user removed from localStorage");
    this.router.navigate(['/signin']);
  }
}


