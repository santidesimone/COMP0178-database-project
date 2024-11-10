import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
  signinForm: FormGroup;
  isSeller = false;
  isBuyer = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {

  //   this.http.post('/api/signin', requestBody).subscribe(
  //     (response) => {
  //       // Handle successful signup (e.g., redirect to login page)
  //       console.log('Signup successful:', response);
  //     },
  //     (error) => {
  //       // Handle signup error (e.g., display error message)
  //       console.error('Signup failed:', error);
  //       this.errorMessage = 'Signup failed. Please try again later.';
  //     }
  //   );

  }
}