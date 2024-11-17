import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PatientService } from '../services/patient.service';
import { LlmSuggestionsComponent } from '../llm-suggestions/llm-suggestions.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, LlmSuggestionsComponent],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient: any = null;
  recentAppointments: any[] = [];
  displayedColumns: string[] = ['date', 'symptoms', 'diagnosis', 'prescriptions'];
  symptoms: string = '';
  suggestions: any = null;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    const patientId = window.history.state.data?.id || '1'; // Fetch patient ID dynamically or use default for testing

    this.fetchPatientDetails(patientId);
    this.fetchRecentAppointments(patientId);
  }

  fetchPatientDetails(patientId: string) {
    this.patientService.getPatientDetails(patientId).subscribe({
      next: (data) => {
        this.patient = data;
      },
      error: (error) => {
        console.error('Error fetching patient details:', error);
      }
    });
  }

  fetchRecentAppointments(patientId: string) {
    this.patientService.getRecentAppointments(patientId).subscribe({
      next: (data) => {
        this.recentAppointments = data;
      },
      error: (error) => {
        console.error('Error fetching recent appointments:', error);
      }
    });
  }

  getSuggestions(symptoms: string) {
    const inputData: any = {
      complaints: symptoms,
      age: this.patient.age,
      gender: this.patient.gender,
      occupation: this.patient.occupation,
      chronic_conditions: this.patient.chronicConditions
    };

    // Call LLM Service (unchanged)
  }
}
