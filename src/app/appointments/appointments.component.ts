import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule here
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  patients = [
    { name: 'John Doe', time: '9:41 AM' },
    { name: 'Michael Kors', time: '10:00 AM' },
    { name: 'Seethal Elias', time: '10:30 AM' },
    { name: 'Abhilash Paul', time: '11:00 AM' },
  ];

  currentDate: string = new Date().toLocaleDateString();

  constructor(private router: Router) {}

  navigateToPatientDetails(patient: any) {
    this.router.navigate(['/patient-details'], { state: { data: patient } });
  }

  logOut() {
    // Add logic here to log out the user
    console.log("Logging out...");
    this.router.navigate(['/']); // Redirect to the sign-in page or home page
  }
}
