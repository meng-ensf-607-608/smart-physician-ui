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
    { date: '2023-09-01', condition: 'Diabetes', prescription: 'Azetomyphil' },
    { date: '2023-08-15', condition: 'High BP', prescription: 'BetaBlock' },
    { date: '2023-07-30', condition: 'Cold', prescription: 'Paracetamol' }
  ];

  displayedColumns: string[] = ['date', 'condition', 'prescription'];

  constructor() {}

  ngOnInit(): void {}

  showSuggestions: boolean = false;

  getSuggestions() {
    this.showSuggestions = true;
  }
}
