import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  name: string;
  age: number;
  major: string;
}

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  // Define the API URL
  private apiUrl = 'http://localhost:3000/students';

  // Inject the HttpClient service
  constructor(private http: HttpClient) { }

  // Method to fetch students from the backend
  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }
}

