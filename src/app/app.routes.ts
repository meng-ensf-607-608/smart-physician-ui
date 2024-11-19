import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'patient-details', component: PatientDetailsComponent },
  { path: 'profile', component: ProfileComponent },
];
