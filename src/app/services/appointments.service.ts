import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = environment.apiUrl + '/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Fetch all appointments
  getAllAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments/all`, { headers: this.getHeaders() });
  }

  // Fetch details of all appointments
  getAllAppointmentDetails(appointmentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointments/details/${appointmentId}`, { headers: this.getHeaders() });
  }

  // Fetch profile data
  getProfileData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/details`, { headers: this.getHeaders() });
  }
}
