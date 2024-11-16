import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { LlmSuggestionsComponent } from '../llm-suggestions/llm-suggestions.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule,MatButtonModule, LlmSuggestionsComponent],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '403-456-7890',
    age: 23,
    gender: 'Male',
    occupation: 'Engineer',
    chronicCondition: 'Diabetes'
  };

  recentAppointments = [
    { date: '2023-09-01', symptoms: 'headache, neck strain', diagnosis: 'Migrain', prescriptions: ['Azetomyphil | 100 mg | 3 times per day | 4 days'] },
    { date: '2023-08-15', symptoms: 'high temperature, body pain', diagnosis: 'Fever', prescriptions: ['BetaBlock | 100 mg | 3 times per day | 7 days'] },
    { date: '2023-07-30', symptoms: 'cough, lack of smell and taste, high temperature', diagnosis: 'Covid', prescriptions: ['Paracetamol | 100 mg | 3 times per day | 7 days', 'Cough syrup | 10 ml | 3 times per day | 7 days'] }
  ];

  displayedColumns: string[] = ['date', 'symptoms', 'diagnosis', 'prescriptions'];

  constructor() {}

  ngOnInit(): void {}

  showSuggestions: boolean = false;

  getSuggestions() {
    this.showSuggestions = true;
  }
}
