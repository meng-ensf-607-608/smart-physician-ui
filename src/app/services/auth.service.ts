import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient directly

  // Login request to the backend
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email: email, password: password });
  }

  // Save the JWT token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve the JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remove the JWT token on logout
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
