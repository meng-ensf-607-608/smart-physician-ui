import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  private apiUrl = environment.llmServiceUrl;

  constructor(private http: HttpClient) {}

  getSuggestions(inputData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/diagnose/invoke`, {input: inputData});
  }
}
