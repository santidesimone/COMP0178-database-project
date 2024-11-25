import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SearchComponent } from './search/search.component';  // Import the SearchComponent
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { CreateNewAuctionComponent } from './create-new-auction/create-new-auction.component';
import { BidsAndPurchasesComponent } from './bids-and-purchases/bids-and-purchases.component';
import { MyAuctionsAndSalesComponent } from './my-auctions-and-sales/my-auctions.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },  
  { path: 'signin', component: SigninComponent },   
  { path: 'search', component: SearchComponent },  
  { path: 'auction-detail', component: AuctionDetailComponent },  
  { path: 'bids-and-purchases', component: BidsAndPurchasesComponent },  
  { path: 'my-auctions-and-sales', component: MyAuctionsAndSalesComponent },  
  { path: 'create-new-auction', component: CreateNewAuctionComponent },  
  { path: 'favorites', component: FavoritesComponent },  
  { path: '', redirectTo: 'signin', pathMatch: 'full' }, 
];
