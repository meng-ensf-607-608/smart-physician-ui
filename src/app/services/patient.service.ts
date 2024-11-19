import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'https://physician-assistant-database-service-38696173603.us-central1.run.app/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPatientDetails(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}`, { headers: this.getHeaders() });
  }

//   getRecentAppointments(patientId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/patients/${patientId}/appointments`, { headers: this.getHeaders() });
//   }
}
