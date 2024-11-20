import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper function to create headers with the JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Appointment Endpoints
  getAllAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/v1/appointments/all`, {
      headers: this.getAuthHeaders()
    });
  }

  getAppointmentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/v1/appointments/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/appointments`, appointmentData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteAppointmentById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/v1/appointments/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Physician Endpoints
  getAllPhysicians(): Observable<any> {
    return this.http.get(`${this.apiUrl}/v1/physicians/all`, {
      headers: this.getAuthHeaders()
    });
  }

  getPhysicianById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/v1/physicians/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createPhysician(physicianData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/physicians`, physicianData, {
      headers: this.getAuthHeaders()
    });
  }

  deletePhysicianById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/v1/physicians/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  
  updateAppointmentDetails(appointmentDetailsData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/appointments/update`, appointmentDetailsData, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json',
    });
  }
}
