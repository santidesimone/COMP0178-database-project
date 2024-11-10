import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionComponent } from './../session.component'; // Adjust the path if needed

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {

  constructor(private   http: HttpClient,
              private router: Router,
              private sessionComponent: SessionComponent, 
  ) { }

  onSubmit(signinForm: any) {
    const email = signinForm.value.email;
    const password = signinForm.value.password;

    this.http.post('http://localhost:3000/api/signin', { email, password }).subscribe({
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
        this.sessionComponent.setUser((response as any[])[0]);  
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