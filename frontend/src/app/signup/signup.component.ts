import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgIf } from '@angular/common'; // Import NgFor for template rendering
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  signupForm: FormGroup;
  isSeller = false;
  isBuyer = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      shippingAddress: [''],
      streetAddress: [''],
      city: [''],
      stateProvince: [''],
      postalCode: [''],
      country: ['']
    });
  }

  onSubmit() {

    this.errorMessage = ''; 

    if (this.signupForm.invalid || (!this.isSeller && !this.isBuyer)) {
      this.errorMessage = 'Please fill in all required fields and select at least one role.';
      return;
    }

    const formData = this.signupForm.value;

    let requestBody: {
      email: string,
      username: string,
      password: string,
      buyerDetails?: { ShippingAddress: string },
      sellerDetails?: {
        StreetAddress: string,
        City: string,
        StateProvince: string,
        PostalCode: string,
        Country: string,
      }
    } = {
      email: formData.email,
      username: formData.username,
      password: formData.password, 
      // Include buyerDetails if isBuyer is true
      buyerDetails: this.isBuyer ? { ShippingAddress: formData.shippingAddress } : undefined, 
      // Include sellerDetails if isSeller is true
      sellerDetails: this.isSeller ? { 
        StreetAddress: formData.streetAddress,
        City: formData.city,
        StateProvince: formData.stateProvince,
        PostalCode: formData.postalCode,
        Country: formData.country
      } : undefined
    };

    this.http.post('http://localhost:3000/api/signup', requestBody).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        // Handle successful signup (e.g., redirect to login page)
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = 'Signup failed. Please try again later.';
        // Handle signup error (e.g., display error message)
      },
      complete: () => {
        // Optional: Handle completion if needed
        console.log('Signup request completed.');
      }
    });


  }
}