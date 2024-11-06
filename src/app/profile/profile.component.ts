import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Note the correct plural: "styleUrls"
})
export class ProfileComponent {

  constructor(private router: Router) {}

  logOut() {
    // Placeholder for actual logout logic
    // For example, redirecting to the Sign-In page:
    this.router.navigate(['/']);
  }
}
