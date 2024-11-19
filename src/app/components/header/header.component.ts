import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class HeaderComponent {
  
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout()
  }
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
