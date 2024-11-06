import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private router: Router) {}

  navigateToAppointments() {
    // Navigates to the Appointments page
    this.router.navigate(['/appointments']);
  }
}
