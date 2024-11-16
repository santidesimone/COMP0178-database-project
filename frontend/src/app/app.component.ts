import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common'; // Import NgFor for template rendering
import { SessionComponent } from './session.component'; // Adjust the path if needed
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  myVariable: any; 
  currentRoute: string = '';  // Store the current route
  inviteLinkBannerIsVisible: boolean = false;
  title = 'angular-boilerplate-1';
  user: any = {};
  userIsSeller: boolean = false;

  constructor(
              private router: Router,
              public sessionComponent: SessionComponent, 
            ) {
    // Listen to navigation events and update the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

    ngOnInit() {
      // this.user = this.sessionComponent.getUser();  
      // if (this.user.hasOwnProperty('sellerDetails')) {
      //   this.userIsSeller = true;
      // }
      this.sessionComponent.isSellerProfile$.subscribe(value => {
        this.userIsSeller = value;
      });
    }

    toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
      if (cartSidebar.style.display === 'none' || cartSidebar.style.display === '') {
        cartSidebar.style.display = 'block';
      } else {
        cartSidebar.style.display = 'none';
      }
    }
  }

  closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
      cartSidebar.style.display = 'none';
    }
  }

  logout() {
    this.sessionComponent.clearUser();  
  }
  
}
// function of(user: User): Observable<User> | null {
//   throw new Error('Function not implemented.');
// }

