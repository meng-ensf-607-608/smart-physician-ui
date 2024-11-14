import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../services/appointments.service';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ProfileComponent],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  patients: any[] = [];
  profile: any = null; // Profile data
  currentDate: string = new Date().toLocaleDateString();

  constructor(
    private router: Router,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
    this.fetchProfileData('1'); // Replace '1' with actual physician ID if available
  }

  fetchAppointments() {
    this.appointmentsService.getAllAppointments().subscribe({
      next: (data) => {
        this.patients = data; // Assuming `data` is an array of appointments
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }

  fetchProfileData(physicianId: string) {
    this.appointmentsService.getProfileData(physicianId).subscribe({
      next: (data) => {
        this.profile = data; // Assuming `data` contains profile info
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      }
    });
  }

  navigateToPatientDetails(patient: any) {
    this.router.navigate(['/patient-details'], { state: { data: patient } });
  }

  logOut() {
    console.log("Logging out...");
    this.router.navigate(['/']);
  }
}
