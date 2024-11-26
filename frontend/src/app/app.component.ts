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
  // inviteLinkBannerIsVisible: boolean = false;
  inviteLinkBannerIsVisible: boolean = true;
  inviteCode: string = "";
  title = 'angular-boilerplate-1';
  user: any = {};
  userIsSeller: boolean = false;
  userIsBuyer: boolean = false;
  displayInviteLink: boolean = false;
  // sessionC: SessionComponent;
  // myGlobalVariable: any;


  constructor(
              private router: Router,
              private route: ActivatedRoute,
              public sessionComponent: SessionComponent, 
            ) {
  }

    ngOnInit() {
      let user:any = this.sessionComponent.getUser();
      if (user["inviteCode"]){
        this.inviteCode = user["inviteCode"];
        console.log(user)
        console.log("this.inviteCode", this.inviteCode)
        this.inviteLinkBannerIsVisible = true;
      }
      if (user.hasOwnProperty('sellerDetails')) {
        this.userIsSeller = true;
      }
      else{
        this.userIsSeller = false;
      }
      console.log("this.userIsSeller")
      console.log(this.userIsSeller)
      console.log("this.userIsSeller")
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
  
  copyLink(){
    console.log("copyLink: executing")
    // navigator.clipboard.writeText("https://localhost:8080/singup/"+this.inviteCode)
    // .then(() => {
    //     // Notify the user that the text was copied
    //     // alert("Link copied to clipboard!");
    // })
    // .catch(err => {
    //     // Handle errors (e.g., if the clipboard API is not supported)
    //     console.error('Failed to copy: ', err);
    // });
  }
  generateInviteLink(){
    this.displayInviteLink = true;
    if (this.user["inviteCode"]){
      this.inviteCode = this.user["inviteCode"];
      console.log(this.user)
      console.log("this.inviteCode", this.inviteCode)
      this.inviteLinkBannerIsVisible = true;
    }
  }
  getInviteLink(){
    return "http://localhost:8080/signup/"+this.inviteCode;
  }
}

