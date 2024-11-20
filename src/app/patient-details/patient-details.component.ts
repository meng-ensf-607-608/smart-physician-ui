import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LlmSuggestionsComponent } from '../llm-suggestions/llm-suggestions.component';
import { PrescriptionDialogComponent } from '../prescription-dialog/prescription-dialog.component';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LlmService } from '../services/llm.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, LlmSuggestionsComponent, FormsModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient: any = null;
  recentAppointments: any[] = [];
  displayedColumns: string[] = ['date', 'symptoms', 'diagnosis', 'prescriptions'];
  symptoms: string = '';
  isGetSuggestionsButtonDisabled: boolean = true;
  thisAppointmentId: string = '';
  suggestions: any = null;

  constructor(private router:Router, private dialog: MatDialog, private llmService: LlmService,private apiService: ApiService) {}

  ngOnInit(): void {
    this.thisAppointmentId = window.history.state.appointmentId;
    const appointmentDetails = window.history.state.data;
    this.patient = appointmentDetails.patient
    var appointmentIds: string[] = [];
    for (let note of appointmentDetails.appointmentNotes) {
      if(!appointmentIds.includes(note.appointmentId)){
        var temp: any[] = [];
        var date: any = null;
        for (let item of appointmentDetails.prescriptions) {
          if(item.appointmentId == note.appointmentId){
            temp.push(`${item.medication} | ${item.dosage} | ${item.duration} | ${item.frequency}`);
          }
          date = item.createdAt;
        }
        appointmentIds.push(note.appointmentId)
        this.recentAppointments.push({'date': date, 'note': note, 'prescriptions': temp});
      };
    }
  }


  openPrescriptionDialog() {
    const symptoms = (document.getElementById('symptoms-textarea') as HTMLTextAreaElement).value;
    const appointmentId = this.thisAppointmentId;
    this.dialog.open(PrescriptionDialogComponent, {
      width: '800px',
      height: '600px',
      data: {symptoms, appointmentId}
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

    this.llmService.getSuggestions(inputData).subscribe({
      next: (data) => {
        this.suggestions = data.output
      },
      error: (error) => {
        console.error('Error fetching suggestions from LLM', error);
      }
    });
  }

  navigateToAppointments() {
    this.router.navigate(['/appointments']);
  }

  checkSymptomsInput(): void {
    this.isGetSuggestionsButtonDisabled = this.symptoms.trim().length === 0;
  }
}
