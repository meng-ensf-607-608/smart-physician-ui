import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { LlmSuggestionsComponent } from '../llm-suggestions/llm-suggestions.component';
import { PrescriptionDialogComponent } from '../prescription-dialog/prescription-dialog.component';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LlmService } from '../services/llm.service';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [MatCardModule, MatTableModule,MatButtonModule, LlmSuggestionsComponent, FormsModule, CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient: any = null;
  symptoms: string = '';
  suggestions: any = null

  ngOnInit(): void {
    this.patient = window.history.state.data;
    console.log(this.patient)
  }

  recentAppointments = [
    { date: '2023-09-01', symptoms: 'headache, neck strain', diagnosis: 'Migrain', prescriptions: ['Azetomyphil | 100 mg | 3 times per day | 4 days'] },
    { date: '2023-08-15', symptoms: 'high temperature, body pain', diagnosis: 'Fever', prescriptions: ['BetaBlock | 100 mg | 3 times per day | 7 days'] },
    { date: '2023-07-30', symptoms: 'cough, lack of smell and taste, high temperature', diagnosis: 'Covid', prescriptions: ['Paracetamol | 100 mg | 3 times per day | 7 days', 'Cough syrup | 10 ml | 3 times per day | 7 days'] }
  ];

  displayedColumns: string[] = ['date', 'symptoms', 'diagnosis', 'prescriptions'];

  constructor(private dialog: MatDialog, private llmService: LlmService) {}

  openPrescriptionDialog() {
    this.dialog.open(PrescriptionDialogComponent, {
      width: '800px',
      height: '600px'
    });
  }


  getSuggestions(symptoms: string) {
    var inputData: any = {
      complaints: symptoms,
      age: this.patient.age,
      gender: this.patient.gender,
      occupation: this.patient.occupation,
      chronic_conditions: this.patient.chronic_conditions
    };
    this.llmService.getSuggestions(inputData).subscribe({
      next: (data) => {
        this.suggestions = data.output
      },
      error: (error) => {
        console.error('Error fetching suggestions from LLM', error);
      }
    });
  }
}
