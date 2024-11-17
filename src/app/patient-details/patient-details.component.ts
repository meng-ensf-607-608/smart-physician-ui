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

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [MatCardModule, MatTableModule,MatButtonModule, LlmSuggestionsComponent, FormsModule, CommonModule],
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

  constructor(private dialog: MatDialog) {}

  openPrescriptionDialog() {
    this.dialog.open(PrescriptionDialogComponent, {
      width: '800px',
      height: '600px'
    });
  }

  ngOnInit(): void {}

  showSuggestions: boolean = false;

  getSuggestions() {
    this.showSuggestions = true;
  }
}
