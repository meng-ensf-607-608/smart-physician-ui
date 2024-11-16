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
  appointments: any[] = [];
  appointmentDetails: Map<string, any> = new Map();
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
        for (let appointment of data) {
          if(isToday(appointment.startTime)) {this.appointments.push(appointment)};
        }
        for (let appointment of this.appointments) {
          this.appointmentsService.getAllAppointmentDetails(appointment.appointmentId).subscribe({
            next: (data) => {
              this.appointmentDetails.set(appointment.appointmentId, data)
            },
            error: (error) => {
              console.error('Error fetching appointment details:', error);
            }
          });
        }
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

  navigateToPatientDetails(appointment: any) {
    this.router.navigate(['/patient-details'], { state: { data: appointment } });
  }

  logOut() {
    console.log("Logging out...");
    this.router.navigate(['/']);
  }
  
}

function isToday(dateString: string): boolean {
  const inputDate = new Date(dateString);
  const today = new Date();

  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() && // Months are zero-indexed
    inputDate.getFullYear() === today.getFullYear()
  );
}