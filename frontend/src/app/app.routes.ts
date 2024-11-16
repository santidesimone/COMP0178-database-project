import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SearchComponent } from './search/search.component';  // Import the SearchComponent
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { CreateNewAuctionComponent } from './create-new-auction/create-new-auction.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },  
  { path: 'signin', component: SigninComponent },   
  { path: 'search', component: SearchComponent },  // Search route
  // { path: 'auction-
  { path: 'auction-detail', component: AuctionDetailComponent },  // Auction Detail route with parameter
  { path: 'create-new-auction', component: CreateNewAuctionComponent },  // Create New Auction route
  { path: '', redirectTo: 'signin', pathMatch: 'full' },  // Default route to redirect to signin

];
