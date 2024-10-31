import { Component, OnInit } from '@angular/core';
import { StudentService } from './services/student.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and ngFor

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'frontend';
  some_var = 'some_value';

  students: any[] = [];

  // Inject the StudentService
  constructor(private studentService: StudentService) { }

  // Fetch students when the component initializes
  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
        console.log(this.students);  // Log the students to see the data
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

}
