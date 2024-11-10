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

  // constructor(private   http: HttpClient,
  //             private router: Router,
  //             private sessionComponent: SessionComponent, 
  // ) { }

  signinForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, 
              private http: HttpClient, 
              private sessionComponent: SessionComponent, 
              private router: Router) {

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

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

    console.log(requestBody)
    // const email = signinForm.value.email;
    // const password = signinForm.value.password;

    // console.log(" email & password")
    // console.log(email)
    // console.log(password)
    // console.log(" email & password")

    this.http.post('http://localhost:3000/api/signin', requestBody).subscribe({
      next: (response) => {
        console.log('Signin successful:', response);
      //   {
      //     "UserID": 1,
      //     "Email": "santiagox@example.com",
      //     "CreatedDate": "2024-11-10T11:31:48.000Z",
      //     "Username": "santiagox1990",
      //     "Password": "securepasswordhash",
      //     "StatusID": 1
      // }
      this.sessionComponent.setUser((response as any));  
      console.log(response)
      this.router.navigate(['/search']); 
        // Handle successful signin, e.g., redirect to another page
      },
      error: (error) => {
        console.error('Signin failed:', error);
        // Handle signin error, e.g., display an error message
      }
    });
  }
}