import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../services/appointments.service';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
    this.fetchProfileData(); // Replace '1' with actual physician ID if available
  }

  fetchAppointments() {
    this.appointmentsService.getAllAppointments().subscribe({
      next: (data) => {
        for (let appointment of data) {
          this.appointments.push(appointment);
        }
        for (let appointment of this.appointments) {
          this.appointmentsService.getAllAppointmentDetails(appointment.appointmentId).subscribe({
            next: (data) => {
              const patient = data.patient || null;
              const appointmentNotes = data.appointmentNotes || null;
              const prescriptions = data.prescriptions || null;
              
              this.appointmentDetails.set(appointment.appointmentId, {
                patient: patient,
                appointmentNotes: appointmentNotes,
                prescriptions: prescriptions,
              });
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

  fetchProfileData() {
    this.appointmentsService.getProfileData().subscribe({
      next: (data) => {
        this.profile = data; // Assuming `data` contains profile info
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
      }
    });
  }

  navigateToPatientDetails(appointmentDetails: any, thisAppointmentId: string) {
    this.router.navigate(['/patient-details'], { state: {data: appointmentDetails, appointmentId:thisAppointmentId} });
  }
  
}

function isToday(utcDateString: string): boolean {
  const today = new Date();
  let utcWithTimezone = utcDateString + 'Z'; // Append 'Z' to indicate UTC
  let localDate = new Date(utcWithTimezone)

  return (
    localDate.getDate() === today.getDate() &&
    localDate.getMonth() === today.getMonth() && // Months are zero-indexed
    localDate.getFullYear() === today.getFullYear()
  );
}