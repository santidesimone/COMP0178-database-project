import { Routes } from '@angular/router';
import { LoginOrSignupComponent } from './login-or-signup/login-or-signup.component';
import { SearchComponent } from './search/search.component';  // Import the SearchComponent
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { CreateNewAuctionComponent } from './create-new-auction/create-new-auction.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login-or-signup', pathMatch: 'full' },  // Default route to redirect to login
  { path: 'login-or-signup', component: LoginOrSignupComponent },  // Login route
  { path: 'search', component: SearchComponent },  // Search route
  { path: 'auction-detail', component: AuctionDetailComponent },  // Auction Detail route
  { path: 'create-new-auction', component: CreateNewAuctionComponent },  // Create New Auction route
];
