import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common'; // Import NgFor for template rendering
import { SessionComponent } from './session.component'; // Adjust the path if needed
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf,AsyncPipe, JsonPipe],
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
  userIsBuyer: boolean = false;
  // sessionC: SessionComponent;
  // myGlobalVariable: any;


  constructor(
              private router: Router,
              private route: ActivatedRoute,
              public sessionComponent: SessionComponent, 
            ) {
  }

    ngOnInit() {
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

