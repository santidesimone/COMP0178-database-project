import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionComponent } from './../session.component'; // Adjust the path if needed

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
  signinForm: FormGroup;
  errorMessage = '';
  inviteCode: string | null = null;

  constructor(private fb: FormBuilder, 
              private http: HttpClient, 
              private sessionComponent: SessionComponent, 
              private router: Router,
            ) {

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.updateAuctionStatuses();
  }

  onSubmit() {
    this.errorMessage = ''; 
    if (this.signinForm.invalid) {
      console.log('form is invalid!')
      console.log(this.signinForm)
      this.errorMessage = 'Please fill in all required fields and select at least one role.';
      return;
    }
    const formData = this.signinForm.value;

    let requestBody: {
      email: string,
      password: string,
    } = {
      email: formData.email,
      password: formData.password, 
    };

    this.http.post('http://localhost:3000/api/signin', requestBody).subscribe({
      next: (response) => {
        console.log('- - - - - - - - - - - - ');
        console.log('Signin successful:', response);
        console.log('- - - - - - - - - - - - ');
      this.sessionComponent.setUser(response);  
      console.log("signin response")
      console.log(response)
      console.log("---------------")
      this.router.navigate(['/search']); 
      },
      error: (error) => {
        console.error('Signin failed:', error);
      }
    });
  }

  updateAuctionStatuses() {
    this.http.post('http://localhost:3000/api/update-auctions-status', {}).subscribe({ 
      next: (response: any) => {
        console.log('Auction statuses updated:', response);
      },
      error: (error) => {
        console.error('Error updating auction statuses:', error);
      }
    });
  }
}